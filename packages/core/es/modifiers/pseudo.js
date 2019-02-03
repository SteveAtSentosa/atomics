"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapPseudoFns = exports.makePseudoFn = exports.pseudoCssStr = exports.pseudoMap = void 0;

var _typeUtils = require("../utils/typeUtils");

var _atomicUtils = require("../utils/atomicUtils");

var _cssUtils = require("../utils/cssUtils");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var pseudoMap = {
  template: '&:^1 { ^2 }',
  selectors: {
    hover: 'hover',
    active: 'active'
  } // given a pseudo selector from pseudoMap.selectors, and a cssStr to
  // associate with selector, return selector aware aware css string, or '' on invalid input
  // eg 'hover' -> 'margin: 0rem;' -> '&:hover { color: #margin: 0rem; };','

};
exports.pseudoMap = pseudoMap;

var pseudoCssStr = function pseudoCssStr(selector, cssStr) {
  return !(0, _typeUtils.isStr)(selector) || !(0, _typeUtils.isStr)(cssStr) || (0, _typeUtils.isUndef)(pseudoMap.selectors[selector]) ? '' : (0, _cssUtils.fillCssTemplate)(["".concat(pseudoMap.selectors[selector]), cssStr], pseudoMap.template);
};

exports.pseudoCssStr = pseudoCssStr;

var validSelectorInput = function validSelectorInput(atoms, selector, cssStr) {
  return (0, _typeUtils.isObj)(atoms) && (0, _typeUtils.isStr)(selector) && (0, _typeUtils.isStr)(cssStr) && !(0, _typeUtils.isUndef)(pseudoMap.selectors[selector]) && !(0, _typeUtils.isUndef)(atoms._reverse[cssStr]);
}; // Create a function that will apply styles at one of the selectors in pseudoMap.selectors
// The function returned recieves a list of the cssStrs (potentially nested) to which
// the specified selectors are applied, and which returns a flattened list of corresponding
// selector aware cssStrs.  The returned function assumes that the corresponding
// non-selector atomic entries have already been added.
// {atoms} -> 'breakPt' -> ([ cssStr &| [cssStrs]]) -> [ 'breakPtAwareCssStrs']


var makePseudoFn = function makePseudoFn(atoms, selector) {
  return function () {
    for (var _len = arguments.length, cssStrs = new Array(_len), _key = 0; _key < _len; _key++) {
      cssStrs[_key] = arguments[_key];
    }

    return (0, _typeUtils.flatten)(cssStrs).map(function (cssStr) {
      if (!validSelectorInput(atoms, selector, cssStr)) return '';

      var _atomicInfoFromCssStr = (0, _atomicUtils.atomicInfoFromCssStr)(atoms, cssStr),
          atomicType = _atomicInfoFromCssStr.atomicType,
          cssSpec = _atomicInfoFromCssStr.cssSpec;

      var pseudoCssSpec = "".concat(selector, ":").concat(cssSpec);
      return (0, _atomicUtils.atomExists)(atoms, atomicType, pseudoCssSpec) ? (0, _atomicUtils.getAtomicCssStr)(atoms, atomicType, pseudoCssSpec) : (0, _atomicUtils.addAtomByCssStr)(atoms, atomicType, pseudoCssSpec, pseudoCssStr(selector, cssStr));
    });
  };
}; // return an object containing all pseudo functions


exports.makePseudoFn = makePseudoFn;

var mapPseudoFns = function mapPseudoFns(atoms, pseudoMap) {
  return Object.keys(pseudoMap.selectors).reduce(function (acc, sel) {
    return _objectSpread({}, acc, _defineProperty({}, sel, makePseudoFn(atoms, sel)));
  }, {});
};

exports.mapPseudoFns = mapPseudoFns;