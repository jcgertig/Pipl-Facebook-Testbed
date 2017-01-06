import { camelCase, snakeCase, forEach, isObject, isArray } from 'lodash';

export const keysToCamel = (obj) => {
  if (!isObject(obj)) { return obj; }
  const newObject = {};
  forEach(Object.keys(obj), (key) => {
    newObject[camelCase(key)] = obj[key];
  });
  return newObject;
};

export const collectionToCamel = (collection) => {
  // console.log("[utils/general] collectionToCamel collection", collection);
  // if (collection === undefined) { return []; }
  if (!isArray(collection)) { return collection; }
  const newCollection = [];
  forEach(collection, (obj) => {
    newCollection.push(keysToCamel(obj));
  });
  return newCollection;
};

export const keysToSnake = (obj) => {
  if (!isObject(obj)) { return obj; }
  const newObject = {};
  forEach(Object.keys(obj), (key) => {
    newObject[snakeCase(key)] = obj[key];
  });
  return newObject;
};
