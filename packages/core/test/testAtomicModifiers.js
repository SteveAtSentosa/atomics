import  { expect } from 'chai'
import { spacingAtomicMap } from '../src/maps/space'
import { flexAtomicMap, displayAtomicMap } from '../src/maps/layout'
import { colorAtomicMap } from '../src/maps/color'
import { mapAtomicFns, at } from '../src/utils/atomicUtils'
import { mapResponsiveFns, rxMap } from '../src/modifiers/responsive'
import { mapPseudoFns, pseudoMap } from '../src/modifiers/pseudo'


export default function runAtomicModifiersTests() {

  let atoms = {}
  const atomicFns = {
    ...mapAtomicFns(atoms, colorAtomicMap),
    ...mapAtomicFns(atoms, flexAtomicMap),
    ...mapAtomicFns(atoms, displayAtomicMap),
    ...mapAtomicFns(atoms, spacingAtomicMap)
  }

  const atomicModifiers = {
    ...mapResponsiveFns(atoms, rxMap),
    ...mapPseudoFns(atoms, pseudoMap)
  }

  const { c, bgc, bc, d, fxd, ai, p,  m, mb, } = atomicFns
  const { hover, active, rxSm, rxMd, rxLg, rxXl } = atomicModifiers

  describe('test atomic modifiers', () => {

    it('should apply reactive modifiers correctly', () => {

      expect(at(rxSm(c('pink-600')))).to.deep.equal([
        '@media (min-width: 576px) { color: #d81b60; };'
      ])
      expect(at(rxMd(d('fx'), fxd('row')))).to.deep.equal([
        '@media (min-width: 768px) { display: flex; };',
        '@media (min-width: 768px) { flex-direction: row; };',
      ])
      expect(at(rxLg(p(1), m(2), d('t')))).to.deep.equal([
        '@media (min-width: 992px) { padding: 0.25rem; };',
        '@media (min-width: 992px) { margin: 0.5rem; };',
        '@media (min-width: 992px) { display: table; };',
      ])
      expect(at(rxXl(ai('fe')))).to.deep.equal([
        '@media (min-width: 1200px) { align-items: flex-end; };'
      ])
    })

    it('should apply psuedeo modifiers correctly', () => {
      expect(at(hover(mb('20px')))).to.deep.equal([
        '&:hover { margin-bottom: 20px; };'
      ])
      expect(at(active(bgc('green-100'), bc('black')))).to.deep.equal([
        '&:active { background-color: #c8e6c9; };',
        '&:active { border-color: #000000; };'
      ])
    })

    it('should apply nested modifiers correctly', () => {
      expect(at(rxMd(hover(m(32))))).to.deep.equal([
        '@media (min-width: 768px) { &:hover { margin: 8rem; }; };',
      ])
    })
  })
}
