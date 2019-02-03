import {
  isStr, toStr, reflect, isNil, isNumOrStr, arrayify, isFn
} from './typeUtils'

// make a css mapping fxn, given a css map in standard format
export const makeCssMapFn = cssMap => cssKey => {
  if (!isNumOrStr(cssKey)) return ''
  const mapped = cssMap.vals[toStr(cssKey)]
  return !isNil(mapped) ? `${mapped}${cssMap.unit || ''}` : toStr(cssKey)
}

const isMapSlot = (slot = ' ') => slot.charAt(0) === '$'

// given a css mapper, an array of css keys and/or values, and a css template, fill the
// template with (potentially mapped) css values.  Trims away any unused template slots and appends ';'
//
// If cssTemplate contains only ^ template slots, cssMapFn does not have to be supplied
// Returns cssTemplate unaltered on invalid input.
// e.g. fillCssTemplate([2, 32], 'padding: $1 $2 $3 $4', mapSpacingKeys) //=> 'padding: 0.5rem 8rep;'
// e.g. fillCssTemplate([2, '18px'], 'padding: $1 ^2', mapSpacingKeys) //=> 'padding: 0.5rem 18px;'
// e.g. fillCssTemplate(['2px', '4px'], 'padding: ^1 ^2 ^3') //=> 'padding: 2px 4px;'
// ['cssVals'] | 'cssVal' -> 'cssTemplate' -> (cssMapFn) -> 'cssStr'
export const fillCssTemplate = (cssKeysOrVals, cssTemplate, cssMapFn = reflect) => {

  if (!isStr(cssTemplate)) return ''

  const slots = cssTemplate.match(/[\^$][0-9]*/g)

  const filled = arrayify(cssKeysOrVals).reduce((filling, cssKeyOrVal, i) => {
    if (isNil(slots) || isNil(slots[i])) return filling
    const insert = isMapSlot(slots[i]) && isFn(cssMapFn) ? cssMapFn(cssKeyOrVal) : toStr(cssKeyOrVal)
    return filling.replace(new RegExp(`\\${slots[i]}`, 'g'), insert)
  }, cssTemplate)

  const trimmed = filled.split(/ *[\\^$]/)[0].trim().concat(';')
  return trimmed
}

// Given a css key, or list of css keys, construct the corresponding cssSpec
// e.g. cssKeysToSpec(8); //=> '8'
// e.g. cssKeysToSpec([1,2,2,1]); //=> '1:2:2:1'
// e.g. cssKeysToSpec(['red-100']); //=> 'red-100'
// e.g. cssKeysToSpec({invalid: 'input'); //=> ''
export const cssKeysToSpec = cssKeys =>
  arrayify(cssKeys).reduce((acc, key, i) => `${acc}${i === 0 ? '' : ':'}${toStr(key)}`, '')
