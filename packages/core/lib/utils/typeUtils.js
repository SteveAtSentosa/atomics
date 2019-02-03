"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOr = exports.get = exports.capitalize = exports.reflect = exports.noop = exports.flatten = exports.arrayify = exports.toStr = exports.isNumOrNonEmptyStr = exports.isNonEmptyStr = exports.isNumOrStr = exports.isNil = exports.isUndef = exports.isFn = exports.isObj = exports.isNum = exports.isStr = exports.isArr = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var isArr = function isArr(toCheck) {
  return Array.isArray(toCheck);
};

exports.isArr = isArr;

var isStr = function isStr(toCheck) {
  return typeof toCheck === 'string';
};

exports.isStr = isStr;

var isNum = function isNum(toCheck) {
  return typeof toCheck === 'number';
};

exports.isNum = isNum;

var isObj = function isObj(toCheck) {
  return !isArr(toCheck) && _typeof(toCheck) === 'object';
};

exports.isObj = isObj;

var isFn = function isFn(toCheck) {
  return typeof toCheck === 'function';
};

exports.isFn = isFn;

var isUndef = function isUndef(toCheck) {
  return toCheck === undefined;
};

exports.isUndef = isUndef;

var isNil = function isNil(toCheck) {
  return toCheck === undefined || toCheck === null;
};

exports.isNil = isNil;

var isNumOrStr = function isNumOrStr(toCheck) {
  return isNum(toCheck) || isStr(toCheck);
};

exports.isNumOrStr = isNumOrStr;

var isNonEmptyStr = function isNonEmptyStr(toCheck) {
  return isStr(toCheck) && toCheck.length > 0;
};

exports.isNonEmptyStr = isNonEmptyStr;

var isNumOrNonEmptyStr = function isNumOrNonEmptyStr(toCheck) {
  return isNum(toCheck) || isNonEmptyStr(toCheck);
};

exports.isNumOrNonEmptyStr = isNumOrNonEmptyStr;

var toStr = function toStr(toConvert) {
  return isStr(toConvert) ? toConvert : String(toConvert);
};

exports.toStr = toStr;

var arrayify = function arrayify(input) {
  return isArr(input) ? input : [input];
};

exports.arrayify = arrayify;

var flatten = function flatten(arr) {
  return arr.reduce(function (acc, val) {
    return Array.isArray(val) ? acc.concat(flatten(val)) : acc.concat(val);
  }, []);
};

exports.flatten = flatten;

var noop = function noop() {
  return undefined;
};

exports.noop = noop;

var reflect = function reflect(v) {
  return v;
}; // below belongs in dataUtils.js


exports.reflect = reflect;

var capitalize = function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}; // get the value at `path` on `obj`
// returns null if any part of path does not exist, or on invalid input


exports.capitalize = capitalize;

var get = function get(path, obj) {
  return isArr(path) && isObj(obj) ? path.reduce(function (xs, x) {
    return xs && xs[x] ? xs[x] : null;
  }, obj) : null;
}; // get the value at `path` on `obj`
// returns `fallback` if any part of path does not exist, or on invalid input


exports.get = get;

var getOr = function getOr(fallback, path, obj) {
  var val = get(path, obj);
  return isNil(val) ? fallback : val;
}; //export const isNonEmptyArr = toCheck => isArr(toCheck) && toCheck.length > 0
//export const isArrOrStr = toCheck => isArr(toCheck) || isStr(toCheck)
//export const isArrOrObj = toCheck => isArr(toCheck) || isObj(toCheck)
// export const isArrOrStrOrNum = toCheck =>
//   isArr(toCheck) || isStr(toCheck) || isNum(toCheck)
// note empty array returns true
// export const isArrOfStr = toCheck =>
//   isArr(toCheck) &&
//   toCheck.reduce((noNonStr, entry) => noNonStr && isStr(entry), true)
// export const isStrOrArrayOfStr = toCheck => isStr(toCheck) || isArrOfStr(toCheck)
// export const flatArrify = input => flatten(arrayify(input))
// remove array duplicates (experimental, only works on arrays of built in types )
// export const unique = toPrune =>
//   isArr(toPrune) ? [...new Set(toPrune)] : toPrune


exports.getOr = getOr;