import { flatten, isStr, isUndef, isObj } from '../utils/typeUtils'
import { atomicInfoFromCssStr, atomExists, getAtomicCss, addAtomByCssStr } from '../utils/atomicUtils'
import { fillCssTemplate } from '../utils/cssUtils'

export const pseudoMap = {
  template: '&:^1 { ^2 }',
  selectors: {
    hover: 'hover',
    active: 'active'
  }
}

// given a pseudo selector from pseudoMap.selectors, and a cssStr to
// associate with selector, return selector aware aware css string, or '' on invalid input
// eg 'hover' -> 'margin: 0rem;' -> '&:hover { color: #margin: 0rem; };','
export const pseudoCssStr = (selector, cssStr) =>
  !isStr(selector) || !isStr(cssStr) || isUndef(pseudoMap.selectors[selector]) ? '' :
  fillCssTemplate([ `${pseudoMap.selectors[selector]}`, cssStr ], pseudoMap.template)

const validSelectorInput = (atoms, selector, cssStr) =>
  isObj(atoms) && isStr(selector) && isStr(cssStr) &&
  !isUndef(pseudoMap.selectors[selector]) && !isUndef(atoms._reverse[cssStr])

// Create a function that will apply styles at one of the selectors in pseudoMap.selectors
// The function returned recieves a list of the cssStrs (potentially nested) to which
// the specified selectors are applied, and which returns a flattened list of corresponding
// selector aware cssStrs.  The returned function assumes that the corresponding
// non-selector atomic entries have already been added.
// {atoms} -> 'breakPt' -> ([ cssStr &| [cssStrs]]) -> [ 'breakPtAwareCssStrs']
export const makePseudoFn = (atoms, selector) => (...cssStrs) =>
  flatten(cssStrs).map(cssStr => {
    if (!validSelectorInput(atoms, selector, cssStr)) return ''

    const { atomicType, cssSpec } = atomicInfoFromCssStr(atoms, cssStr)
    const pseudoCssSpec = `${selector}:${cssSpec}`
    return atomExists(atoms, atomicType, pseudoCssSpec) ?
      getAtomicCss(atoms, atomicType, pseudoCssSpec) :
      addAtomByCssStr(atoms, atomicType, pseudoCssSpec, pseudoCssStr(selector, cssStr))
  })

// return an object containing all pseudo functions
export const mapPseudoFns = (atoms, pseudoMap) =>
  Object.keys(pseudoMap.selectors).reduce((acc, sel) =>
    ({ ...acc, [sel]: makePseudoFn(atoms, sel) }), {})

