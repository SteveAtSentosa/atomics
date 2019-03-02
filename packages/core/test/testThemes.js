import  { expect } from 'chai'
import atomics from '../src/atomics'
import {
  getGlobalThemePropCssSpec,
  getTypedThemePropCssSpec,
  getThemePropCssSpec,
  themePropToCssKey
} from '../src/utils/themeUtils'


// const theme = {
//
//   GLOBAL THEME
//
//   complimentaryOne:   'cyan:600',    <--- global theme entry
//   ^ global themeProp  ^ themeCssSpec
//
//   TYPED THEMES
//
//  bgc: { <--- applied to atomic type 'bgc' (backgroundClolr)
//  ^ atomicType
//    light:              'grey:100',   <--- typed theme entry
//    dark:               'purpble:800',
//    ^ typed themeProp   ^themeCssSpec
// },
//
// A themeProp maps to a specific cssSpec
// A themeProp may be either global or associated with an atomicType long name
// When attempting to apply themes
// (1) Apply typed theme if one exists for the atomicType and themeProp
// (2) Else apply gobal theme if one exists for the theme themeProp
// (3) Else apply no theme


export default function runThemeTests() {
  const theme = {

    // Glogal theme

    // Universal app colors colors
    primaryOne: 'deep-purple-700',
    primaryTwo: 'amber-700',
    complimentaryOne: 'blue-200',
    complimentaryTwo: 'cyan-600',

    // grey scale
    white: 'white',
    black: 'black',
    darkest: 'grey-800',
    darker: 'grey-700',
    dark: 'grey-600',
    medium: 'grey-500',
    light: 'grey-400',
    lighter: 'grey-300',
    lightest: 'grey-200',

    veryNarrow: 1,
    narrow: 2,
    wide: 8,
    veryWide: 32,

    // Typed themes
    // Specific to atomicType long names

    bgc: {
      forTesting: 'red-200',
      primaryOne: 'orange-700',
    },
    c: {
      standOut: 'cyan-700',
    }
  }

  describe('test atomic themes', () => {
    it('should get proper cssSpecs for global themeProps ', () => {
      expect(getGlobalThemePropCssSpec(theme, 'primaryOne')).to.equal('deep-purple-700')
      expect(getGlobalThemePropCssSpec(theme, 'veryWide')).to.equal(32)
      expect(getGlobalThemePropCssSpec(theme, 'bogus')).to.equal(null)
      expect(getGlobalThemePropCssSpec(theme, {})).to.equal(null)
    })
    it('should get proper cssSpecs for typed themeType ', () => {
      expect(getTypedThemePropCssSpec(theme, 'bgc', 'forTesting')).to.equal('red-200')
      expect(getTypedThemePropCssSpec(theme, 'c', 'standOut')).to.equal('cyan-700')
      expect(getTypedThemePropCssSpec(theme, 'c', 'bogus')).to.equal(null)
    })
    it('should prefer typed theme over global theme', () => {
      expect(getThemePropCssSpec(theme, 'bgc', 'primaryOne')).to.equal('orange-700')
      expect(getThemePropCssSpec(theme, 'c', 'primaryOne')).to.equal('deep-purple-700')
      expect(getThemePropCssSpec(theme, 'noAtomicTypeEntry', 'primaryOne')).to.equal('deep-purple-700')
      expect(getThemePropCssSpec(theme, 'noAtomicTypeEntry', 'noGlobalEntry')).to.equal('noGlobalEntry')
    })
    it('apply theme only to props designated as such', () => {
      expect(themePropToCssKey(theme, 'bgc', '@forTesting')).to.equal('red-200')
      expect(themePropToCssKey(theme, 'bgc', 'forTesting')).to.equal('forTesting')
      expect(themePropToCssKey(theme, 'bgc', '@light')).to.equal('grey-400')
      expect(themePropToCssKey(theme, 'bgc', 'light')).to.equal('light')
      expect(themePropToCssKey(theme, 'padding', '@wide')).to.equal(8)
    })
    it('atomic functions should apply themeing', () => {
      const { c, bgc, p, at, installTheme, rxMd, hover } = atomics
      installTheme(theme)
      expect(at(c('@standOut'))).to.deep.equal(['color: #0097a7;'])
      expect(at(c('@primaryOne'))).to.deep.equal(['color: #512da8;'])
      expect(at(bgc('@primaryOne'))).to.deep.equal(['background-color: #f57c00;'])
      expect(at(p('@narrow'))).to.deep.equal(['padding: 0.5rem;'])
      expect(at(rxMd(c('@standOut')))).to.deep.equal(['@media (min-width: 768px) { color: #0097a7; };'])
      expect(at(hover(c('@dark')))).to.deep.equal(['&:hover { color: #757575; };'])
    })
  })
}
