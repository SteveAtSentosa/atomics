import { makeCssMapFn } from '../utils/cssUtils'

export const fontSizeMap = {
  unit: 'rem',
  vals: {
    'xs': 0.75, 'sm': 0.875, 'base': 1, 'lg': 1.125,
    'xl': 1.25, '2xl': 1.5, '3xl': 1.875, '4xl': 2.25, '5xl': 3
  }
}

export const mapFontSize = makeCssMapFn(fontSizeMap)

export const fontSizeAtomicMap = {
  fontSize: { atomicType: 'fz',  cssTemplate: 'font-size: $1', cssMapFn: mapFontSize },
}

export const fontWeightMap = {
  unit: '',
  vals: {
    'hairline': 100,
    'thin': 200,
    'light': 300,
    'normal': 400,
    'medium': 500,
    'semibold': 600,
    'bold': 700,
    'extrabold': 800,
    'black': 900,
  }
}

export const mapFontWeight = makeCssMapFn(fontWeightMap)

export const fontWeightAtomicMap = {
  fontSize: { atomicType: 'fw',  cssTemplate: 'font-weight: $1', cssMapFn: mapFontWeight },
}

export const lineHeightMap = {
  unit: '',
  vals: {
    squashed: 1,
    tight:    1.25,
    normal:   1.5,
    loose:    2
  }
}

export const mapLineHeight = makeCssMapFn(lineHeightMap)

export const lineHeightAtomicMap = {
  lineHeight: { atomicType: 'lh',  cssTemplate: 'line-height: $1', cssMapFn: mapLineHeight },
}
