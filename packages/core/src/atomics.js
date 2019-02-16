import { spacingAtomicMap } from './maps/space'
import { flexAtomicMap, displayAtomicMap } from './maps/layout'
import { colorAtomicMap } from './maps/color'
import { fontSizeAtomicMap, fontWeightAtomicMap, lineHeightAtomicMap } from './maps/font'
import { positionAtomicMap } from './maps/position'
import { sizeAtomicMap } from './maps/size'


import { mapResponsiveFns, rxMap } from './modifiers/responsive'
import { mapPseudoFns, pseudoMap } from './modifiers/pseudo'

import { mapAtomicFns } from './utils/atomicUtils'



let atoms = {
  _mapCssFn: null
}

const atomicFns = {
  ...mapAtomicFns(atoms, colorAtomicMap),
  ...mapAtomicFns(atoms, flexAtomicMap),
  ...mapAtomicFns(atoms, displayAtomicMap),
  ...mapAtomicFns(atoms, spacingAtomicMap),
  ...mapAtomicFns(atoms, fontSizeAtomicMap),
  ...mapAtomicFns(atoms, fontWeightAtomicMap),
  ...mapAtomicFns(atoms, lineHeightAtomicMap),
  ...mapAtomicFns(atoms, positionAtomicMap),
  ...mapAtomicFns(atoms, sizeAtomicMap),
}

const atomicModifiers = {
  ...mapResponsiveFns(atoms, rxMap),
  ...mapPseudoFns(atoms, pseudoMap)
}

const atomicUtils = {
  setCssMapFn:  fn => { atoms._mapCssFn = fn },
  clearCssMapFn:  () => { atoms._mapCssFn = null },
  resetAtoms: () => { atoms = { _mapCssFn: null } },
  getAtoms: () => atoms // for debugging only
}


// experiement .. if it works, find cleaner way
const molecules = {
  size: (w, h) => [
    atomicFns[sizeAtomicMap.width.atomicType](w),
    atomicFns[sizeAtomicMap.height.atomicType](h),
  ]
}

export default {
  ...atomicFns,
  ...atomicModifiers,
  ...atomicUtils,
  molecules
}



