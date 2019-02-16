import  { expect } from 'chai'
import { mergeDeepRight } from 'ramda'
import { mapSpace } from '../src/maps/space'
import { mapDisplay } from '../src/maps/layout'
import { mapColor } from '../src/maps/color'
import { addAtomByCssKeys, getAtomicCssStr, atomicInfoFromCssStr } from '../src/utils/atomicUtils'

const tests = [
  //                                                              expected      expected
  //       cssMapFn      cssTemplate              cssKeys         cssSpec       cssStr
  [ 'c',   mapColor,    'color: $1',             'amber-a700',   'amber-a700', 'color: #ffab00;' ],
  [ 'p',   mapSpace,    'padding: $1 $2 $3 $4',  [1, 2, 3],      '1:2:3',      'padding: 0.25rem 0.5rem 0.75rem;' ],
  [ 'm',   mapSpace,    'margin: $1 $2 $3 $4',    4,             '4',          'margin: 1rem;' ],
  [ 'd',   mapDisplay,  'display: $1',           'ifx',          'ifx',        'display: inline-flex;' ],
  [ 'fx',  null,        'flex: ^1 ^2 ^3',        [1, 2, 'auto'], '1:2:auto',   'flex: 1 2 auto;' ],
  // |
  // atomicType
]

export default function runAtomTests() {
  describe('test atoms', () => {
    it('should add atoms correctly', () => {

      let atoms = { _reverse: {}, _mapCssFn: null }
      let atomsRef = { _reverse: {}, _mapCssFn: null }

      tests.forEach(t => {

        const atomicType = t[0]
        const cssMapFn = t[1]
        const cssTemplate = t[2]
        const cssKeys = t[3]
        const expectedCssSpec = t[4]
        const expectedCssStr = t[5]
        const expectedAtom = { [expectedCssSpec]: { cssStr: expectedCssStr, mappedCss: '' } }

        const cssStr = addAtomByCssKeys(atoms, atomicType, cssMapFn, cssTemplate, cssKeys)
        expect(cssStr).to.equal(expectedCssStr)
        atomsRef = mergeDeepRight(atomsRef, { [atomicType] : expectedAtom })
        atomsRef._reverse = mergeDeepRight(atomsRef._reverse, { [cssStr]: { atomicType, cssSpec: expectedCssSpec } })
        expect(atoms).to.deep.equal(atomsRef)
        expect(getAtomicCssStr(atoms, atomicType, expectedCssSpec)).to.equal(expectedCssStr)
        expect(atomicInfoFromCssStr(atoms, cssStr)).to.deep.equal({ atomicType, cssSpec: expectedCssSpec })
      })
    })
  })
}

