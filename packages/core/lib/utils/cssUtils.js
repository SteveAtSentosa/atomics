"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cssKeysToSpec = exports.fillCssTemplate = exports.makeCssMapFn = void 0;

var _typeUtils = require("./typeUtils");

// make a css mapping fxn, given a css map in standard format
var makeCssMapFn = function makeCssMapFn(cssMap) {
  return function (cssKey) {
    if (!(0, _typeUtils.isNumOrStr)(cssKey)) return '';
    var mapped = cssMap.vals[(0, _typeUtils.toStr)(cssKey)];
    return !(0, _typeUtils.isNil)(mapped) ? "".concat(mapped).concat(cssMap.unit || '') : (0, _typeUtils.toStr)(cssKey);
  };
};

exports.makeCssMapFn = makeCssMapFn;

var isMapSlot = function isMapSlot() {
  var slot = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ' ';
  return slot.charAt(0) === '$';
}; // given a css mapper, an array of css keys and/or values, and a css template, fill the
// template with (potentially mapped) css values.  Trims away any unused template slots and appends ';'
//
// If cssTemplate contains only ^ template slots, cssMapFn does not have to be supplied
// Returns cssTemplate unaltered on invalid input.
// e.g. fillCssTemplate([2, 32], 'padding: $1 $2 $3 $4', mapSpacingKeys) //=> 'padding: 0.5rem 8rep;'
// e.g. fillCssTemplate([2, '18px'], 'padding: $1 ^2', mapSpacingKeys) //=> 'padding: 0.5rem 18px;'
// e.g. fillCssTemplate(['2px', '4px'], 'padding: ^1 ^2 ^3') //=> 'padding: 2px 4px;'
// ['cssVals'] | 'cssVal' -> 'cssTemplate' -> (cssMapFn) -> 'cssStr'


var fillCssTemplate = function fillCssTemplate(cssKeysOrVals, cssTemplate) {
  var cssMapFn = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _typeUtils.reflect;
  if (!(0, _typeUtils.isStr)(cssTemplate)) return '';
  var slots = cssTemplate.match(/[\^$][0-9]*/g);
  var filled = (0, _typeUtils.arrayify)(cssKeysOrVals).reduce(function (filling, cssKeyOrVal, i) {
    if ((0, _typeUtils.isNil)(slots) || (0, _typeUtils.isNil)(slots[i])) return filling;
    var insert = isMapSlot(slots[i]) && (0, _typeUtils.isFn)(cssMapFn) ? cssMapFn(cssKeyOrVal) : (0, _typeUtils.toStr)(cssKeyOrVal);
    return filling.replace(new RegExp("\\".concat(slots[i]), 'g'), insert);
  }, cssTemplate);
  var trimmed = filled.split(/ *[\\^$]/)[0].trim().concat(';');
  return trimmed;
}; // Given a css key, or list of css keys, construct the corresponding cssSpec
// e.g. cssKeysToSpec(8); //=> '8'
// e.g. cssKeysToSpec([1,2,2,1]); //=> '1:2:2:1'
// e.g. cssKeysToSpec(['red-100']); //=> 'red-100'
// e.g. cssKeysToSpec({invalid: 'input'); //=> ''


exports.fillCssTemplate = fillCssTemplate;

var cssKeysToSpec = function cssKeysToSpec(cssKeys) {
  return (0, _typeUtils.arrayify)(cssKeys).reduce(function (acc, key, i) {
    return "".concat(acc).concat(i === 0 ? '' : ':').concat((0, _typeUtils.toStr)(key));
  }, '');
};

exports.cssKeysToSpec = cssKeysToSpec;