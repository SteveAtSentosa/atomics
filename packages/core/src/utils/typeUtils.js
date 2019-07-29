export const isArr = toCheck => Array.isArray(toCheck)
export const isStr = toCheck => typeof toCheck === 'string'
export const isNum = toCheck => typeof toCheck === 'number'
export const isObj = toCheck => !isArr(toCheck) && typeof toCheck === 'object'
export const isFn = toCheck => typeof toCheck === 'function'
export const isUndef = toCheck => toCheck === undefined
export const isNil = toCheck => toCheck === undefined || toCheck === null
export const isNumOrStr = toCheck => isNum(toCheck) || isStr(toCheck)
export const isNonEmptyStr = toCheck => isStr(toCheck) && toCheck.length > 0
export const isNumOrNonEmptyStr = toCheck => isNum(toCheck) || isNonEmptyStr(toCheck)

export const toStr = toConvert => isStr(toConvert) ? toConvert : String(toConvert)
export const arrayify = input => (isArr(input) ? input : [input])

export const noop = () => undefined
export const reflect = v => v

// below belongs in dataUtils.js

export const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1)

// get the value at `path` on `obj`
// returns null if any part of path does not exist, or on invalid input
export const get = (path, obj) => isArr(path) && isObj(obj) ?
  path.reduce((xs, x) => (xs && xs[x]) ? xs[x] : null, obj) : null

// get the value at `path` on `obj`
// returns `fallback` if any part of path does not exist, or on invalid input
export const getOr = (fallback, path, obj) => {
  const val = get(path, obj)
  return isNil(val) ? fallback : val
}

//export const isNonEmptyArr = toCheck => isArr(toCheck) && toCheck.length > 0
//export const isArrOrStr = toCheck => isArr(toCheck) || isStr(toCheck)
//export const isArrOrObj = toCheck => isArr(toCheck) || isObj(toCheck)
// export const isArrOrStrOrNum = toCheck =>
//   isArr(toCheck) || isStr(toCheck) || isNum(toCheck)
// note empty array returns true
// export const isArrOfStr = toCheck =>
//   isArr(toCheck) &&
//   toCheck.reduce((noNonStr, entry) => noNonStr && isStr(entry), true)

// export const isStrOrArrayOfStr = toCheck => isStr(toCheck) || isArrOfStr(toCheck)


// adapted from https://github.com/jonschlinkert/arr-flatten/blob/master/index.js
export const flatten = arr => flat(arr, [])
const flat = (arr, res) => {
  let i = 0; let cur; let len = arr.length
  for (; i < len; i++) {
    cur = arr[i]
    Array.isArray(cur) ? flat(cur, res) : res.push(cur)
  }
  return res
}


export const flatArrify = input => flatten(arrayify(input))

// remove array duplicates (experimental, only works on arrays of built in types )
// export const unique = toPrune =>
//   isArr(toPrune) ? [...new Set(toPrune)] : toPrune
