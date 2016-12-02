/* global google, Promise */
import { sortBy, has, get, isUndefined, isFunction, isString } from 'lodash';

export const clean = (str) => {
  if (isUndefined(str) || str === null) { return ''; }
  if (!isString(str)) { return str; }
  return str
    .replace(/\s+/g, ' ')
    .replace(/undefined/g, '')
    .replace(/\s,/g, ',')
    .trim()
    .replace(/^,\s/, '')
    .replace(/^,,\s/, '')
    .replace(/,\s,/g, ',')
    .trim()
    .replace(/^,\s/, '')
    .replace(/^,,\s/, '')
    .replace(/,\s,/g, ',');
};

function compareString(stringA, stringB) {
  return new Promise((done, fail) => {
    let val = 0;
    if (stringA === stringB) {
      return done(1);
    } else {
      if (stringB.indexOf(stringA) > -1) {
        val += 0.33;
      }
      if (stringA.indexOf(stringB) > -1) {
        val += 0.33;
      }
    }
    return done(val);
  });
}

const addresToString = ({ house, street, city, state, zipCode, country }) => {
  return clean(`${house} ${street}, ${city}, ${state} ${zipCode}, ${country}`);
};

function getLatLng(address) {
  const geocoder = new google.maps.Geocoder();

  return new Promise((done, fail) => {
    const makeCall = () => {
      geocoder.geocode({ address }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          return done(results[0].geometry.location);
        }
        if (status === 'OVER_QUERY_LIMIT') {
          return setTimeout(makeCall, 2000);
        }
        console.log('getLatLng', status, results);
        return fail();
      });
    };
    makeCall();
  });
}

function compareAddress(addressesA, addressesB) {
  return new Promise((done, fail) => {
    let val = 0;
    const _valA = addresToString(addressesA);
    const _valB = addresToString(addressesB);
    if (_valA.length <= 3 || _valB.length <= 3) { return done(val); }
    return Promise.all([getLatLng(_valA), getLatLng(_valB)])
      .then(([valA, valB]) => {
        const distance = google.maps.geometry.spherical.computeDistanceBetween(valA, valB);
        const diff = distance - 40234;
        if (diff <= 0) {
          const tenth = 40234 / 10;
          val += ((40234 - (40234 - Math.abs(diff))) / tenth) * 0.33;
        }
        done(val);
      })
      .catch(() => done(val));
  });
}

const compareisons = {
  addresses: {
    action: compareAddress,
  },
  educations: {
    attr: 'school',
    action: compareString,
  },
  jobs: {
    attr: 'organization',
    action: compareString,
  },
  names: {
    attr: 'last',
    action: compareString,
  },
  relationships: {
    attr: (relationship) => `${relationship.names[0].first} ${relationship.names[0].last}`,
    addSection: 'names',
    addAttr: (name) => `${name.first} ${name.last}`,
    action: compareString,
  },
};

export function compare(piplA, piplB) {
  return new Promise((done, fail) => {
    let val = 0;
    const proms = [];
    const addVal = (_val) => { val += _val; };
    for (const key of Object.keys(compareisons)) {
      if (has(piplA, key) && has(piplB, key)) {
        const { attr, addSection, addAttr, action } = compareisons[key];
        for (const itemA of piplA[key]) {
          for (const itemB of piplB[key]) {
            let valA = itemA;
            let valB = itemB;
            if (!isUndefined(attr)) {
              if (isFunction(attr)) {
                valA = attr(valA);
                valB = attr(valB);
              } else {
                valA = get(valA, attr);
                valB = get(valB, attr);
              }
            }
            proms.push(action(clean(valA), clean(valB)).then(addVal));
          }
        }
        if (!isUndefined(addSection) && has(piplA, addSection)) {
          const section = compareisons[addSection];
          for (const itemA of piplA[addSection]) {
            for (const itemB of piplB[key]) {
              let valA = itemA;
              let valB = itemB;
              if (!isUndefined(addAttr)) {
                if (isFunction(addAttr)) {
                  valA = addAttr(valA);
                } else {
                  valA = get(valA, addAttr);
                }
              } else if (!isUndefined(section.attr)) {
                if (isFunction(section.attr)) {
                  valA = section.attr(valA);
                } else {
                  valA = get(valA, section.attr);
                }
              }
              if (!isUndefined(attr)) {
                if (isFunction(attr)) {
                  valB = attr(valB);
                } else {
                  valB = get(valB, attr);
                }
              }
              proms.push(action(clean(valA), clean(valB)).then(addVal));
            }
          }
        }
      }
    }

    Promise.all(proms)
      .then(() => {
        done(val);
      })
      .catch(() => done(val));
  });
}

export function compareAll(piplA, pipls) {
  return new Promise((done, fail) => {
    if (piplA === null || pipls === null) {
      return done(null);
    }
    const vals = [];
    const proms = [];
    for (const pipl of pipls) {
      proms.push(compare(piplA, pipl).then((value) => {
        vals.push({ pipl, value });
      }));
    }
    return Promise.all(proms)
      .then(() => done(sortBy(vals, ['value']).reverse()))
      .catch(() => done(sortBy(vals, ['value']).reverse()));
  });
}
