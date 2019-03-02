import { isObj, isStr, isNumOrNonEmptyStr, isUndef, isNonEmptyStr, flatten, isNil, isFn } from './typeUtils'
import { cssKeysToSpec, fillCssTemplate } from './cssUtils'
import { themePropToCssKey } from './themeUtils'

// const atoms = {
//   pt : { <-- atomicType
//     1: { <-- cssSpec
//       cssStr: 'padding-top: 0.25rem',
//                ^cssProp    ^cssVal
//       mappedCss: {}
//     },
//     2: {
//       cssStr: 'padding-top: 0.5rem',
//       mappedCss: {}
//     },
//     c : {
//       red: {
//         cssStr: 'color: #c62828',
//         mappedCss: {}
//       }
//     }
//   }
// }

// Atomic vector: { atomicType, cssSpec, css }
//                                       ^ cssStr if mapping not active
//                                       ^ mappedCss if mapping is active

// is atomic input valid?
// {atoms} -> 'atomicType' -> 'cssSpec' -> bool
export const validAtomicInput = (atoms, atomicType, cssSpec) =>
  isObj(atoms) && isNonEmptyStr(atomicType) && isNumOrNonEmptyStr(cssSpec)

// does an atomic type currently exist on atoms?
// {} -> '' -> bool
export const atomicTypeExists = (atoms, atomicType) =>
  isObj(atoms) && isNonEmptyStr(atomicType) && isObj(atoms[atomicType])

// check for atom existance
// {} -> '' -> '' -> bool
export const atomExists = (atoms, atomicType, cssSpec) =>
  validAtomicInput(atoms, atomicType, cssSpec) &&
  atomicTypeExists(atoms, atomicType) &&
  !isUndef(atoms[atomicType][cssSpec])

// get an atom's cssStr
// Returns '' if atom does not exist, or on invalid input
// {atoms} -> 'atomicType' -> 'cssSpec' -> 'cssStr' | any:mappedCss
export const getAtomicCssStr = (atoms, atomicType, cssSpec) =>
  atomExists(atoms, atomicType, cssSpec) ? atoms[atomicType][cssSpec]['cssStr'] : ''

export const getAtomicMappedCss = (atoms, atomicType, cssSpec) =>
  atomExists(atoms, atomicType, cssSpec) ? atoms[atomicType][cssSpec]['mappedCss'] : ''

const mappingActive = atoms => isFn(atoms._mapCssFn)
const mapCssStr = (atoms, cssStr) => mappingActive(atoms) ? atoms._mapCssFn(cssStr) : ''

export const getAtomicVec = (atoms, atomicType, cssSpec) => ({
  atomicType,
  cssSpec,
  css : mappingActive(atoms) ?
    getAtomicMappedCss(atoms, atomicType, cssSpec) :
    getAtomicCssStr(atoms, atomicType, cssSpec)
})

// Add an atom if you arlready know the cssString
// returns atomicVec
export const addAtomByCssStr = (atoms, atomicType, cssSpec, cssStr) => {
  if (!validAtomicInput(atoms, atomicType, cssSpec) || !isStr(cssStr)) return ''

  // add the atom
  if (!atomicTypeExists(atoms, atomicType)) atoms[atomicType] = {}
  const mappedCss = mapCssStr(atoms, cssStr)
  atoms[atomicType][cssSpec] = { cssStr, mappedCss }

  return getAtomicVec(atoms, atomicType, cssSpec)
}

// Add an atom to the atoms object
// If the corresponding atom already exists, it is overwritten
// Returns the cssStr corresponding the the constructed atom
// {atoms} -> 'atomicType' -> (cssMapFn) 'cssTemplate' -> [cssTemplate: '' | num] -> {atomicVec}
export const addAtomByCssKeys = (atoms, atomicType, cssMapFn, cssTemplate, cssKeys) => {
  const cssSpec = cssKeysToSpec(cssKeys)
  const cssStr = fillCssTemplate(cssKeys, cssTemplate, cssMapFn)
  return addAtomByCssStr(atoms, atomicType, cssSpec, cssStr)
}

// create a function which will accept 1 or more cssKeys and return corresponding atomicVector
// {atoms} -> 'atomicType' -> (cssMapFn) 'cssTemplate' -> (atomicFn) -> {atomicVec}
export const makeAtomicFn = (atoms, atomicType, cssMapFn, cssTemplate) =>
  (...possiblyThemedCssKeys) => {
    const cssKeys = possiblyThemedCssKeys.map(cssKeyOrThemeProp =>
      themePropToCssKey(atoms._theme, atomicType, cssKeyOrThemeProp))
    const cssSpec = cssKeysToSpec(cssKeys)
    return atomExists(atoms, atomicType, cssSpec) ?
      getAtomicVec(atoms, atomicType, cssSpec) :
      addAtomByCssKeys(atoms, atomicType, cssMapFn, cssTemplate, cssKeys)
  }

// Wrapper for atomic function and atomic modifier calls
// Receives an list consisting of atomic vectors, nested to any level
// Returns list of corresponding css (cssStr || mapped Css)
// [ {av} &| [ {av} ]] => ['cssStr' | *mappedCss*]
export const at = (...atomicVectors) => {
  return flatten(atomicVectors).map(v => !isNil(v.css) ? v.css : '')
}

// Given an atomic map, return object containing corresponding atomic functions
// {} -> {} -> {}
export const mapAtomicFns = (atoms, atomicMap) =>
  !isObj(atoms) || !isObj(atomicMap) ? {} :
  Object.keys(atomicMap).reduce(
    (acc, cssProp) => {
      const { atomicType, cssTemplate, cssMapFn } = atomicMap[cssProp]
      return { ...acc, [atomicType]: makeAtomicFn(atoms, atomicType, cssMapFn, cssTemplate) }
    }, {})
