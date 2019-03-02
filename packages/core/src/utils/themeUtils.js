
import { isStr, isObj, isUndef } from './typeUtils'

// const theme = {
//
//   /* Global theme properties */
//
//   complimentaryOne:       'cyan:600',
//   ^ global themeProp       ^ themeVal
//
//  /* Theme properties specific to atomic types */
//
//  backgroundColor: {
//  ^ atomicType (long name)
//    light:       'grey:100',
//    dark:        'purpble:800',
//    ^ themeProp  ^themeVal
// },


export const getGlobalThemePropCssSpec = (theme, themeProp) =>
  isObj(theme) && isStr(themeProp) &&
  !isUndef(theme[themeProp]) ? theme[themeProp] : null

export const getTypedThemePropCssSpec = (theme, atomicType, themeProp) =>
  isObj(theme) && isStr(themeProp) &&
  !isUndef(theme[atomicType]) && !isUndef(theme[atomicType][themeProp]) ?
  theme[atomicType][themeProp] : null

export const getThemePropCssSpec = (theme, atomicType, themeProp) =>
  getTypedThemePropCssSpec(theme, atomicType, themeProp) ||
  getGlobalThemePropCssSpec(theme, themeProp) ||
  themeProp


const isThemeProp = toCheck => isStr(toCheck) && toCheck.charAt(0) === '@'
const raw = themeProp => themeProp.substr(1)

export const themePropToCssKey = (theme, atomicType, themeProp) =>
  isObj(theme) && isStr(atomicType) && isThemeProp(themeProp) ?
  getThemePropCssSpec(theme, atomicType, raw(themeProp)) :
  themeProp

