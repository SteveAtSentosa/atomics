"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapAtomicFns = exports.makeAtomicFn = exports.atomicInfoFromCssStr = exports.addAtomByCssKeys = exports.addAtomByCssStr = exports.getAtomicCssStr = exports.atomExists = exports.atomicTypeExists = exports.validAtomicInput = void 0;

var _typeUtils = require("./typeUtils");

var _cssUtils = require("./cssUtils");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//import { getOr } from './typeUtils'
// atoms = {
//   pt : { <-- atomicType
//     1:            'padding-top: 0.25rem', <-- an atom,  applied via atomic fxn pt(1)
//     2:            'padding-top: 0.5rem'   <-- another atom, applied via atomic fxn pt(2)
//     ^              ^
//     cssSpec        cssStr (css string or classname, depening upon definition of toClass())
//
//   c : { <-- a second atomicType
//     red:           'color:     #c62828',  <-- an atom, applied via atomic fxn c('red')
//   }                ^cssProp    ^cssVal
// }
// is atomic input valid?
// {atoms} -> 'atomicType' -> 'cssSpec' -> bool
var validAtomicInput = function validAtomicInput(atoms, atomicType, cssSpec) {
  return (0, _typeUtils.isObj)(atoms) && (0, _typeUtils.isNonEmptyStr)(atomicType) && (0, _typeUtils.isNumOrNonEmptyStr)(cssSpec);
}; // does an atomic type currently exist on atoms?
// {} -> '' -> bool


exports.validAtomicInput = validAtomicInput;

var atomicTypeExists = function atomicTypeExists(atoms, atomicType) {
  return (0, _typeUtils.isObj)(atoms) && (0, _typeUtils.isNonEmptyStr)(atomicType) && (0, _typeUtils.isObj)(atoms[atomicType]);
}; // check for atom existance
// {} -> '' -> '' -> bool


exports.atomicTypeExists = atomicTypeExists;

var atomExists = function atomExists(atoms, atomicType, cssSpec) {
  return validAtomicInput(atoms, atomicType, cssSpec) && atomicTypeExists(atoms, atomicType) && !(0, _typeUtils.isUndef)(atoms[atomicType][cssSpec]);
}; // get an atomic cssStr
// Returns '' if atom does not exist, or on invalid input
// {atoms} -> 'atomicType' -> 'cssSpec' -> 'cssStr'


exports.atomExists = atomExists;

var getAtomicCssStr = function getAtomicCssStr(atoms, atomicType, cssSpec) {
  return atomExists(atoms, atomicType, cssSpec) ? atoms[atomicType][cssSpec] : '';
}; // Add an atom if you arlready know the cssString
// returns cssStr


exports.getAtomicCssStr = getAtomicCssStr;

var addAtomByCssStr = function addAtomByCssStr(atoms, atomicType, cssSpec, cssStr) {
  if (!validAtomicInput(atoms, atomicType, cssSpec) || !(0, _typeUtils.isStr)(cssStr)) return ''; // add the atom

  if (!atomicTypeExists(atoms, atomicType)) atoms[atomicType] = {};
  atoms[atomicType][cssSpec] = cssStr; // add to the reverse atom

  if ((0, _typeUtils.isUndef)(atoms['_reverse'])) atoms['_reverse'] = {};
  atoms['_reverse'][cssStr] = {
    atomicType: atomicType,
    cssSpec: cssSpec
  };
  return cssStr;
}; // Add an atom to the atoms object
// If the corresponding atom already exists, it is overwritten
// Returns the cssStr corresponding the the constructed atom
// {atoms} -> 'atomicType' -> (cssMapFn) 'cssTemplate' -> ['' | num] -> cssStr


exports.addAtomByCssStr = addAtomByCssStr;

var addAtomByCssKeys = function addAtomByCssKeys(atoms, atomicType, cssMapFn, cssTemplate, cssKeys) {
  var cssSpec = (0, _cssUtils.cssKeysToSpec)(cssKeys);
  var cssStr = (0, _cssUtils.fillCssTemplate)(cssKeys, cssTemplate, cssMapFn);
  return addAtomByCssStr(atoms, atomicType, cssSpec, cssStr);
}; // 'cssStr' -> { atomicType, cssSpec }


exports.addAtomByCssKeys = addAtomByCssKeys;
var nullAtomicInfo = {
  atomicType: undefined,
  cssSpec: undefined
};

var atomicInfoFromCssStr = function atomicInfoFromCssStr(atoms, cssStr) {
  return (0, _typeUtils.getOr)(nullAtomicInfo, ['_reverse', cssStr], atoms);
}; // create a function which will accept 1 or more cssKeys and return corresponding cssStr
// {atoms} -> 'atomicType' -> (cssMapFn) 'cssTemplate' -> (atomicFn)


exports.atomicInfoFromCssStr = atomicInfoFromCssStr;

var makeAtomicFn = function makeAtomicFn(atoms, atomicType, cssMapFn, cssTemplate) {
  return function () {
    for (var _len = arguments.length, cssKeys = new Array(_len), _key = 0; _key < _len; _key++) {
      cssKeys[_key] = arguments[_key];
    }

    var cssSpec = (0, _cssUtils.cssKeysToSpec)(cssKeys);
    return atomExists(atoms, atomicType, cssSpec) ? getAtomicCssStr(atoms, atomicType, cssSpec) : addAtomByCssKeys(atoms, atomicType, cssMapFn, cssTemplate, cssKeys);
  };
}; // Given an atomic map, return object containing corresponding atomic functions
// {} -> {} -> {}


exports.makeAtomicFn = makeAtomicFn;

var mapAtomicFns = function mapAtomicFns(atoms, atomicMap) {
  return !(0, _typeUtils.isObj)(atoms) || !(0, _typeUtils.isObj)(atomicMap) ? {} : Object.keys(atomicMap).reduce(function (acc, cssProp) {
    var _atomicMap$cssProp = atomicMap[cssProp],
        atomicType = _atomicMap$cssProp.atomicType,
        cssTemplate = _atomicMap$cssProp.cssTemplate,
        cssMapFn = _atomicMap$cssProp.cssMapFn;
    return _objectSpread({}, acc, _defineProperty({}, atomicType, makeAtomicFn(atoms, atomicType, cssMapFn, cssTemplate)));
  }, {});
};

exports.mapAtomicFns = mapAtomicFns;