"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapResponsiveFns = exports.makeResponsiveFn = exports.responsiveCssStr = exports.rxMap = void 0;

var _typeUtils = require("../utils/typeUtils");

var _atomicUtils = require("../utils/atomicUtils");

var _cssUtils = require("../utils/cssUtils");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var rxMap = {
  template: '@media (min-width: ^1) { ^2 }',
  unit: 'px',
  fnPrefix: 'rx',
  breakPts: {
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200
  } // Given a break point from rxMap.breakPts, and a cssStr to associate with the breakpoint
  // return the corresponding breakpoint aware css string.  Return '' on invalid input
  // eg 'md' -> 'margin: 0rem;' -> '@media (min-width: 768px) { margin: 0rem; };'

};
exports.rxMap = rxMap;

var responsiveCssStr = function responsiveCssStr(breakPt, cssStr) {
  return !(0, _typeUtils.isStr)(breakPt) || !(0, _typeUtils.isStr)(cssStr) || (0, _typeUtils.isUndef)(rxMap.breakPts[breakPt]) ? '' : (0, _cssUtils.fillCssTemplate)(["".concat(rxMap.breakPts[breakPt]).concat(rxMap.unit), cssStr], rxMap.template);
};

exports.responsiveCssStr = responsiveCssStr;

var validBreakPtInput = function validBreakPtInput(atoms, breakPt, cssStr) {
  return (0, _typeUtils.isObj)(atoms) && (0, _typeUtils.isStr)(breakPt) && (0, _typeUtils.isStr)(cssStr) && !(0, _typeUtils.isUndef)(rxMap.breakPts[breakPt]) && !(0, _typeUtils.isUndef)(atoms._reverse[cssStr]);
}; // Create a function that will apply styles at one of the breakpoints in rxMap.breakPts
// The function returned recieves a list of the cssStrs (potentially nested) to which
// the specified breakpoint are applied, and which returns a flattened list of corresponding
// breakPt aware cssStrs.  The returned function assumes that the corresponding
// non-breakoint atomic entries have already been added.
// {atoms} -> 'breakPt' -> ([ cssStr &| [cssStrs]]) -> [ 'breakPtAwareCssStrs']


var makeResponsiveFn = function makeResponsiveFn(atoms, breakPt) {
  return function () {
    for (var _len = arguments.length, cssStrs = new Array(_len), _key = 0; _key < _len; _key++) {
      cssStrs[_key] = arguments[_key];
    }

    return (0, _typeUtils.flatten)(cssStrs).map(function (cssStr) {
      if (!validBreakPtInput(atoms, breakPt, cssStr)) return '';

      var _atomicInfoFromCssStr = (0, _atomicUtils.atomicInfoFromCssStr)(atoms, cssStr),
          atomicType = _atomicInfoFromCssStr.atomicType,
          cssSpec = _atomicInfoFromCssStr.cssSpec;

      var responsiveCssSpec = "".concat(breakPt, ":").concat(cssSpec);
      return (0, _atomicUtils.atomExists)(atoms, atomicType, responsiveCssSpec) ? (0, _atomicUtils.getAtomicCssStr)(atoms, atomicType, responsiveCssSpec) : (0, _atomicUtils.addAtomByCssStr)(atoms, atomicType, responsiveCssSpec, responsiveCssStr(breakPt, cssStr));
    });
  };
}; // return an object containing all responsive functions


exports.makeResponsiveFn = makeResponsiveFn;

var mapResponsiveFns = function mapResponsiveFns(atoms, rxMap) {
  return Object.keys(rxMap.breakPts).reduce(function (acc, bp) {
    return _objectSpread({}, acc, _defineProperty({}, "".concat(rxMap.fnPrefix).concat((0, _typeUtils.capitalize)(bp)), makeResponsiveFn(atoms, bp)));
  }, {});
};

exports.mapResponsiveFns = mapResponsiveFns;