import runCssMapTests from './testCssMaps'
import runUtilsTests from './testUtils'
import runCssTemplateTests from './testCssTemplates'
import runCssSpecTests from './testCssSpecs'
import runAtomTests from './testAtoms'
import runAtomFunctionTests from './testAtomicFn'
import runAtomicModifierTests from './testAtomicModifiers'
import runThemeTests from './testThemes'

describe('atomics tests', () => {
  runUtilsTests()
  runCssMapTests()
  runCssTemplateTests()
  runCssSpecTests()
  runAtomTests()
  runAtomFunctionTests()
  runAtomicModifierTests()
  runThemeTests()
})
