import materialDesignColors from '../themeSupport/materialDesignColors'
import { makeCssMapFn } from '../utils/cssUtils'

export const colorMap = {
  unit: '',
  vals: {
    ...materialDesignColors,

    // add custom colors, theming, etc here
    'primaryOne': materialDesignColors['deep-purple-700'],
    'primaryTwo': materialDesignColors['amber-700'],
    'complimentaryOne': materialDesignColors['blue-a200'],
    'complimentaryTwo': materialDesignColors['cyan-600'],
  }
}

export const mapColor = makeCssMapFn(colorMap)

export const colorAtomicMap = {
  color:           { atomicType: 'c',   cssTemplate: 'color: $1',            cssMapFn: mapColor },
  backgroundColor: { atomicType: 'bgc', cssTemplate: 'background-color: $1', cssMapFn: mapColor },
  borderColor:     { atomicType: 'bc',  cssTemplate: 'border-color: $1',     cssMapFn: mapColor },
}
