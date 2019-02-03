import { spacingAtomicMap } from './maps/space'
import { flexAtomicMap, displayAtomicMap } from './maps/layout'
import { colorAtomicMap } from './maps/color'
import { mapAtomicFns } from './utils/atomicUtils'
import { mapResponsiveFns, rxMap } from './modifiers/responsive'
import { mapPseudoFns, pseudoMap } from './modifiers/pseudo'

const atoms = {}

const atomicFns = {
  ...mapAtomicFns(atoms, colorAtomicMap),
  ...mapAtomicFns(atoms, flexAtomicMap),
  ...mapAtomicFns(atoms, displayAtomicMap),
  ...mapAtomicFns(atoms, spacingAtomicMap)
}

const atomicModifiers = {
  ...mapResponsiveFns(atoms, rxMap),
  ...mapPseudoFns(atoms, pseudoMap)
}

export default {
  ...atomicFns,
  ...atomicModifiers
}



