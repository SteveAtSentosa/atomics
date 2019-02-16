// TODO
// * update comments to indicate that returns mappedCss if map fxn has been provided

import { isObj, isStr, isNumOrNonEmptyStr, isUndef, isNonEmptyStr, getOr, isFn } from './typeUtils'
import { cssKeysToSpec, fillCssTemplate } from './cssUtils'
//import { getOr } from './typeUtils'

// atoms = {
//   pt : { <-- atomicType
//     1:            'padding-top: 0.25rem', <-- an atom,  applied via atomic fxn pt(1)
//     2:            'padding-top: 0.5rem'   <-- another atom, applied via atomic fxn pt(2)
//     ^              ^
//     cssSpec        cssStr (css string or classname, depening upon definition of toClass())
//
//   c : { <-- a second atomicType
//     red:           'color:     #c62828',  <-- an atom, applied via atomic fxn c('red')
//   }                ^cssProp    ^cssVal
// }



// const atoms = {
//   pt : {
//     1: {
//       cssStr: 'padding-top: 0.25rem',
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

// if css mapping is active, atoms mappedCss, otherwise returns cssStr
export const getAtomicCss = (atoms, atomicType, cssSpec) =>
  atoms._cssMaping.isActive ?
    getAtomicCssStr(atoms, atomicType, cssSpec) :
    getAtomicMappedCss(atoms, atomicType, cssSpec)

// atomExists(atoms, atomicType, cssSpec)
//   atoms._cssMaping.isActive ?
//   mappedCss


//   isActive,
//   mapFn: isActive ? mapCssFn : null
// })

// const atomicUtils = {
//   setCssMapFn:  fn => { atoms._cssMaping = mapOptions(true, fn) },


//   const mapOptions = (mappingActive, mapCssFn) => ({
//     mappingActive,
//     mapCss: mappingActive ? mapCssFn : null
//   })

//   const atomicUtils = {
//     setCssMapFn:  fn => { atoms._cssMaping = mapOptions(true, fn) },
//     clearCssMapFn:  () => { atoms._cssMaping = mapOptions(false) }


// Add an atom if you arlready know the cssString
// returns cssStr
export const addAtomByCssStr = (atoms, atomicType, cssSpec, cssStr) => {
  if (!validAtomicInput(atoms, atomicType, cssSpec) || !isStr(cssStr)) return ''

  // add the atom
  if (!atomicTypeExists(atoms, atomicType)) atoms[atomicType] = {}
  //atoms[atomicType][cssSpec] = {cssStr
  //atoms[atomicType][cssSpec] = atoms._cssToClass(cssStr)

  // add to the reverse atom
  if (isUndef(atoms['_reverse'])) atoms['_reverse'] = {}
  atoms['_reverse'][cssStr] = { atomicType, cssSpec }

  return cssStr
}

// Add an atom to the atoms object
// If the corresponding atom already exists, it is overwritten
// Returns the cssStr corresponding the the constructed atom
// {atoms} -> 'atomicType' -> (cssMapFn) 'cssTemplate' -> ['' | num] -> cssStr
export const addAtomByCssKeys = (atoms, atomicType, cssMapFn, cssTemplate, cssKeys) => {
  const cssSpec = cssKeysToSpec(cssKeys)
  const cssStr = fillCssTemplate(cssKeys, cssTemplate, cssMapFn)
  return addAtomByCssStr(atoms, atomicType, cssSpec, cssStr)
}

// 'cssStr' -> { atomicType, cssSpec }
const nullAtomicInfo = { atomicType: undefined, cssSpec: undefined }
export const atomicInfoFromCssStr = (atoms, cssStr) =>
  getOr(nullAtomicInfo, ['_reverse', cssStr], atoms)

// create a function which will accept 1 or more cssKeys and return corresponding cssStr
// {atoms} -> 'atomicType' -> (cssMapFn) 'cssTemplate' -> (atomicFn)
export const makeAtomicFn = (atoms, atomicType, cssMapFn, cssTemplate) =>
  (...cssKeys) => {
    const cssSpec = cssKeysToSpec(cssKeys)
    return atomExists(atoms, atomicType, cssSpec) ?
      getAtomicCssStr(atoms, atomicType, cssSpec) :
      addAtomByCssKeys(atoms, atomicType, cssMapFn, cssTemplate, cssKeys)
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
