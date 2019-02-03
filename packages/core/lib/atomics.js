"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _space = require("./maps/space");

var _layout = require("./maps/layout");

var _color = require("./maps/color");

var _atomicUtils = require("./utils/atomicUtils");

var _responsive = require("./modifiers/responsive");

var _pseudo = require("./modifiers/pseudo");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var atoms = {};

var atomicFns = _objectSpread({}, (0, _atomicUtils.mapAtomicFns)(atoms, _color.colorAtomicMap), (0, _atomicUtils.mapAtomicFns)(atoms, _layout.flexAtomicMap), (0, _atomicUtils.mapAtomicFns)(atoms, _layout.displayAtomicMap), (0, _atomicUtils.mapAtomicFns)(atoms, _space.spacingAtomicMap));

var atomicModifiers = _objectSpread({}, (0, _responsive.mapResponsiveFns)(atoms, _responsive.rxMap), (0, _pseudo.mapPseudoFns)(atoms, _pseudo.pseudoMap));

var _default = _objectSpread({}, atomicFns, atomicModifiers);

exports.default = _default;