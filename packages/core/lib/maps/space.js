"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.spacingAtomicMap = exports.mapSpace = exports.spaceMap = void 0;

var _cssUtils = require("../utils/cssUtils");

var spaceMap = {
  unit: 'rem',
  vals: {
    0: 0,
    1: 0.25,
    2: 0.5,
    3: 0.75,
    4: 1,
    5: 1.25,
    6: 1.5,
    8: 2,
    10: 2.5,
    12: 3,
    16: 4,
    20: 5,
    24: 6,
    32: 8
  }
};
exports.spaceMap = spaceMap;
var mapSpace = (0, _cssUtils.makeCssMapFn)(spaceMap);
exports.mapSpace = mapSpace;
var spacingAtomicMap = {
  padding: {
    atomicType: 'p',
    cssTemplate: 'padding: $1 $2 $3 $4',
    cssMapFn: mapSpace
  },
  paddingTop: {
    atomicType: 'pt',
    cssTemplate: 'padding-top: $1',
    cssMapFn: mapSpace
  },
  paddingBottom: {
    atomicType: 'pb',
    cssTemplate: 'padding-bottom: $1',
    cssMapFn: mapSpace
  },
  paddingLeft: {
    atomicType: 'pl',
    cssTemplate: 'padding-left: $1',
    cssMapFn: mapSpace
  },
  paddingRight: {
    atomicType: 'pr',
    cssTemplate: 'padding-right: $1',
    cssMapFn: mapSpace
  },
  paddingVert: {
    atomicType: 'py',
    cssTemplate: 'padding: $1 0',
    cssMapFn: mapSpace
  },
  paddingHoriz: {
    atomicType: 'px',
    cssTemplate: 'padding: 0 $1',
    cssMapFn: mapSpace
  },
  margin: {
    atomicType: 'm',
    cssTemplate: 'margin: $1 $2 $3 $4',
    cssMapFn: mapSpace
  },
  marginTop: {
    atomicType: 'mt',
    cssTemplate: 'margin-top: $1',
    cssMapFn: mapSpace
  },
  marginBottom: {
    atomicType: 'mb',
    cssTemplate: 'margin-bottom: $1',
    cssMapFn: mapSpace
  },
  marginLeft: {
    atomicType: 'ml',
    cssTemplate: 'margin-left: $1',
    cssMapFn: mapSpace
  },
  marginRight: {
    atomicType: 'mr',
    cssTemplate: 'margin-right: $1',
    cssMapFn: mapSpace
  },
  marginVert: {
    atomicType: 'my',
    cssTemplate: 'margin: $1 0',
    cssMapFn: mapSpace
  },
  marginHoriz: {
    atomicType: 'mx',
    cssTemplate: 'margin: 0 $1',
    cssMapFn: mapSpace
  }
};
exports.spacingAtomicMap = spacingAtomicMap;