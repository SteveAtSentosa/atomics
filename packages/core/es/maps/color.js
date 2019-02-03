"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.colorAtomicMap = exports.mapColor = exports.colorMap = void 0;

var _materialDesignColors = _interopRequireDefault(require("../themeSupport/materialDesignColors"));

var _cssUtils = require("../utils/cssUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var colorMap = {
  unit: '',
  vals: _objectSpread({}, _materialDesignColors.default, {
    // add custom colors, theming, etc here
    '@primaryOne': _materialDesignColors.default['deep-purple-700'],
    '@primaryTwo': _materialDesignColors.default['amber-700'],
    '@complimentaryOne': _materialDesignColors.default['blue-a200'],
    '@complimentaryTwo': _materialDesignColors.default['cyan-600']
  })
};
exports.colorMap = colorMap;
var mapColor = (0, _cssUtils.makeCssMapFn)(colorMap);
exports.mapColor = mapColor;
var colorAtomicMap = {
  color: {
    atomicType: 'c',
    cssTemplate: 'color: $1',
    cssMapFn: mapColor
  },
  backgroundColor: {
    atomicType: 'bgc',
    cssTemplate: 'background-color: $1',
    cssMapFn: mapColor
  },
  borderColor: {
    atomicType: 'bc',
    cssTemplate: 'border-color: $1',
    cssMapFn: mapColor
  }
};
exports.colorAtomicMap = colorAtomicMap;