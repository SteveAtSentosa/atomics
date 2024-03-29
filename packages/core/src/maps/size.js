import { makeCssMapFn } from '../utils/cssUtils'

export const sizeMap = {
  unit: '',
  vals: {
    0: '0rem',
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    6: '1.5rem',
    8: '2rem',
    10: '2.5rem',
    12: '3rem',
    16: '4rem',
    24: '6rem',
    32: '8rem',
    48: '12rem',
    64: '16rem',
    128: '32rem',
    auto: 'auto',
    px: '1px',
    '1/2': '50%',
    '1/3': '33.33333%',
    '2/3': '66.66667%',
    '1/4': '25%',
    '3/4': '75%',
    '1/5': '20%',
    '2/5': '40%',
    '3/5': '60%',
    '4/5': '80%',
    '1/6': '16.66667%',
    '5/6': '83.33333%',
    'full': '100%',
    'w-screen': '100vw',
    'h-screen': '100vh'
  }
}

export const mapSize = makeCssMapFn(sizeMap)

export const sizeAtomicMap = {
  width:     { atomicType: 'w',   cssTemplate: 'width: $1',      cssMapFn: mapSize },
  height:    { atomicType: 'h',   cssTemplate: 'height: $1',     cssMapFn: mapSize },
  minWidth:  { atomicType: 'mw',  cssTemplate: 'min-width: $1',  cssMapFn: mapSize },
  minHeight: { atomicType: 'mh',  cssTemplate: 'min-height: $1', cssMapFn: mapSize },
}

