/* global google, Promise */
import React, { PropTypes } from 'react';
import { sortBy, has, get, isUndefined, isFunction, isString, isPlainObject } from 'lodash';

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

export const DateBlock = (props) => (
  <div style={{ marginBottom: '10px' }}>
    <div>{props.lineOne}</div>
    <div>{props.lineTwo}</div>
    {props.dateRange ? <div>{props.dateRange.start} - {isUndefined(props.dateRange.end) ? 'Present' : props.dateRange.end}</div> : null}
  </div>
);

DateBlock.propTypes = {
  lineOne: PropTypes.string.isRequired,
  lineTwo: PropTypes.string.isRequired,
  dateRange: PropTypes.shape({
    start: PropTypes.string,
    end: PropTypes.number,
  }),
};

export const mapping = {
  names: {
    node: false,
    collection: true,
    path: ({ first, last, middle, prefix, postfix }) => clean(`${prefix} ${first} ${middle} ${last} ${postfix}`),
    text: 'Name',
  },
  dob: {
    path: 'date_range.start',
    text: 'Date of Birth',
  },
  gender: {
    path: 'content',
    text: 'Gender',
  },
  phones: {
    collection: true,
    path: 'number',
    text: 'Phone Numbers',
  },
  addresses: {
    collection: true,
    path: ({ house, street, city, state, zipCode, country }) => clean(`${house} ${street}, ${city}, ${state} ${zipCode}, ${country}`),
    text: 'Addresses',
  },
  relationships: {
    collection: true,
    path: (item) => {
      const { first, last, middle, prefix, postfix } = item.names[0];
      return clean(`${prefix} ${first} ${middle} ${last} ${postfix}`);
    },
    text: 'Relationships',
  },
  jobs: {
    collection: true,
    path: (item) => DateBlock({ lineOne: item.title, lineTwo: item.organization, dateRange: item.dateRange }),
    text: 'Jobs',
  },
  educations: {
    collection: true,
    path: (item) => DateBlock({ lineOne: item.degree, lineTwo: item.school, dateRange: item.dateRange }),
    text: 'Education',
  },
  usernames: {
    node: false,
    collection: true,
    path: 'content',
    text: 'Usernames',
  },
};

export function compareString(addressLatLang, stringA, stringB) {
  return new Promise((done, fail) => {
    let val = 0;
    if (stringA === stringB) {
      return done({ data: { valA: stringA, valB: stringB }, _val: 1 });
    } else if (stringA.length === 0 || stringB.length === 0) {
      return done({ data: { valA: stringA, valB: stringB }, _val: 0 });
    } else {
      if (stringB.indexOf(stringA) > -1) {
        val += 0.33;
      }
      if (stringA.indexOf(stringB) > -1) {
        val += 0.33;
      }
    }
    return done({ data: { valA: stringA, valB: stringB }, _val: val });
  });
}

export function addressToString({ house, street, city, state, zipCode, country }) {
  return clean(`${house} ${street}, ${city}, ${state} ${zipCode}, ${country}`);
}

function getLatLng(addressLatLang, address) {
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
        return fail();
      });
    };
    if (has(addressLatLang, address)) {
      done(addressLatLang[address]);
    } else {
      makeCall();
    }
  });
}

export function distanceBetween(locA, locB) {
  if (isPlainObject(locA)) {
    locA._lat = locA.lat;
    locA.lat = () => locA._lat;
    locA._lng = locA.lng;
    locA.lng = () => locA._lng;
  }
  if (isPlainObject(locB)) {
    locB._lat = locB.lat;
    locB.lat = () => locB._lat;
    locB._lng = locB.lng;
    locB.lng = () => locB._lng;
  }
  return google.maps.geometry.spherical.computeDistanceBetween(locA, locB);
}

export function compareAddress(addressLatLang, addressesA, addressesB) {
  return new Promise((done, fail) => {
    let val = 0;
    const _valA = addressToString(addressesA);
    const _valB = addressToString(addressesB);
    if (_valA.length <= 3 || _valB.length <= 3) { return done({ _val: val }); }
    return Promise.all([getLatLng(addressLatLang, _valA), getLatLng(addressLatLang, _valB)])
      .then(([valA, valB]) => {
        const distance = distanceBetween(valA, valB);
        const diff = distance - 40234;
        if (diff <= 0) {
          const tenth = 40234 / 10;
          val += ((40234 - (40234 - Math.abs(diff))) / tenth) * 0.33;
        }
        addressLatLang[_valA] = valA;
        addressLatLang[_valB] = valB;
        done({ data: { valA: _valA, valB: _valB }, other: 'thing', _val: val });
      })
      .catch((dat) => done({ _val: val }));
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

export function getConnections(addressLatLang, piplA, piplB) {
  return new Promise((done, fail) => {
    const connections = {};
    const proms = [];
    const addVal = function (key, { _val, data }) {
      if (!has(connections, key)) {
        connections[key] = [];
      }
      if (_val > 0) {
        connections[key].push(data);
      }
    };
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
            proms.push(action(addressLatLang, clean(valA), clean(valB)).then(addVal.bind(this, key)));
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
              proms.push(action(clean(valA), clean(valB)).then(addVal.bind(this, key)));
            }
          }
        }
      }
    }

    Promise.all(proms)
      .then(() => done(connections))
      .catch(() => done(connections));
  });
}

export function compare(addressLatLang, piplA, piplB) {
  return new Promise((done, fail) => {
    let val = 0;
    const proms = [];
    const addVal = ({ _val }) => { val += _val; };
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
            proms.push(action(addressLatLang, clean(valA), clean(valB)).then(addVal));
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
      .then(() => done(val))
      .catch(() => done(val));
  });
}

export function buildConnections(addressLatLang, userA, pipls, allCompared) {
  const compared = {};
  return new Promise((done, fail) => {
    if (userA === null || pipls === null) {
      return done(null);
    }
    const proms = [];
    for (const pipl of pipls) {
      if (has(allCompared, `${userA.id}-vs-${pipl.id}`) || has(allCompared, `${pipl.id}-vs-${userA.id}`)) {
        if (has(allCompared, `${userA.id}-vs-${pipl.id}`)) {
          compared[`${userA.id}-vs-${pipl.id}`] = allCompared[`${userA.id}-vs-${pipl.id}`];
        } else {
          compared[`${pipl.id}-vs-${userA.id}`] = allCompared[`${pipl.id}-vs-${userA.id}`];
        }
        return null;
      }
      if (!has(userA, 'pipl') || !has(pipl, 'pipl') || !has(userA.pipl, 'pipl') || !has(pipl.pipl, 'pipl')) {
        return null;
      }
      if (userA.pipl.pipl === null || pipl.pipl.pipl === null) {
        return null;
      }

      proms.push(getConnections(addressLatLang, userA.pipl.pipl, pipl.pipl.pipl).then((data) => {
        if (has(allCompared, `${userA.id}-vs-${pipl.id}`) || has(allCompared, `${pipl.id}-vs-${userA.id}`)) {
          if (has(allCompared, `${userA.id}-vs-${pipl.id}`)) {
            compared[`${userA.id}-vs-${pipl.id}`] = allCompared[`${userA.id}-vs-${pipl.id}`];
          } else {
            compared[`${pipl.id}-vs-${userA.id}`] = allCompared[`${pipl.id}-vs-${userA.id}`];
          }
          return null;
        }
        compared[`${userA.id}-vs-${pipl.id}`] = { userA, userB: pipl, data };
        return (allCompared[`${userA.id}-vs-${pipl.id}`] = { userA, userB: pipl, data });
      }));
    }
    return Promise.all(proms)
      .then(() => done({ compared, allCompared, addressLatLang }))
      .catch(() => done({ compared, allCompared, addressLatLang }));
  });
}

export function compareAll(addressLatLang, piplA, pipls) {
  return new Promise((done, fail) => {
    if (piplA === null || pipls === null) {
      return done(null);
    }
    const vals = [];
    const proms = [];
    for (const pipl of pipls) {
      proms.push(compare(addressLatLang, piplA, pipl).then((value) => {
        vals.push({ pipl, value });
      }));
    }
    return Promise.all(proms)
      .then(() => done({ data: sortBy(vals, ['value']).reverse(), addressLatLang }))
      .catch(() => done({ data: sortBy(vals, ['value']).reverse(), addressLatLang }));
  });
}
