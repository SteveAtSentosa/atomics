import { flatten, capitalize, isStr, isUndef, isObj } from '../utils/typeUtils'
import { atomExists, getAtomicCssStr, addAtomByCssStr, getAtomicVec } from '../utils/atomicUtils'
import { fillCssTemplate } from '../utils/cssUtils'

export const rxMap = {
  template: '@media (min-width: ^1) { ^2 }',
  unit: 'px',
  fnPrefix: 'rx',
  breakPts: {
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
  }
}

// Given a break point from rxMap.breakPts, and a cssStr to associate with the breakpoint
// return the corresponding breakpoint aware css string.  Return '' on invalid input
// eg 'md' -> 'margin: 0rem;' -> '@media (min-width: 768px) { margin: 0rem; };'
export const responsiveCssStr = (breakPt, cssStr) =>
  !isStr(breakPt) || !isStr(cssStr) || isUndef(rxMap.breakPts[breakPt]) ? '' :
  fillCssTemplate([`${rxMap.breakPts[breakPt]}${rxMap.unit}`, cssStr], rxMap.template)

const validBreakPtInput = (atoms, breakPt, atomicVec) =>
  isObj(atoms) && isStr(breakPt) && isObj(atomicVec) &&
  !isUndef(rxMap.breakPts[breakPt])


// Create a function that will apply styles at one of the breakpoints in rxMap.breakPts
// The function returned recieves a list of the atomicVectors (potentially nested) to which
// the specified breakpoint are applied, and which returns a flattened list of corresponding
// breakPt aware atomicVectors.  The returned function assumes that the corresponding
// non-breakoint atomic entries have already been added.
// {atoms} -> 'breakPt' -> ([{atomicVecs}]) -> [{breakPtAwareAtomicVecs}]
export const makeResponsiveFn = (atoms, breakPt) => (...atomicVecs) =>
  flatten(atomicVecs).map(atomicVec => {

    if (!validBreakPtInput(atoms, breakPt, atomicVec)) return ''
    const { atomicType, cssSpec } = atomicVec
    const cssStr = getAtomicCssStr(atoms, atomicType, cssSpec)
    const responsiveCssSpec = `${breakPt}:${cssSpec}`
    return atomExists(atoms, atomicType, responsiveCssSpec) ?
      getAtomicVec(atoms, atomicType, responsiveCssSpec) :
      addAtomByCssStr(atoms, atomicType, responsiveCssSpec, responsiveCssStr(breakPt, cssStr))
  })


// return an object containing all responsive functions
export const mapResponsiveFns = (atoms, rxMap) =>
  Object.keys(rxMap.breakPts).reduce((acc, bp) =>
    ({ ...acc, [`${rxMap.fnPrefix}${capitalize(bp)}`]: makeResponsiveFn(atoms, bp) }), {})

