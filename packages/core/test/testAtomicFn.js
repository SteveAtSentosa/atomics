import  { expect } from 'chai'
import { spacingAtomicMap } from '../src/maps/space'
import { flexAtomicMap, displayAtomicMap } from '../src/maps/layout'
import { colorAtomicMap } from '../src/maps/color'
import { mapAtomicFns } from '../src/utils/atomicUtils'


export default function runAtomicFnTests() {
  let atoms = {}
  const atomicFns = {
    ...mapAtomicFns(atoms, colorAtomicMap),
    ...mapAtomicFns(atoms, flexAtomicMap),
    ...mapAtomicFns(atoms, displayAtomicMap),
    ...mapAtomicFns(atoms, spacingAtomicMap)
  }

  const {
    c, bgc, bc,
    d, fxd, fxw, fxf, ai, jc, ac, as, ord, fxg, fxs, fxb, fx,
    p, pt, pb, pl, pr, py, px, m, mt, mb, ml, mr, my, mx } = atomicFns

  describe('test atomic functions', () => {
    it('should construct and apply atomic functions correctly', () => {

      expect(c('blue-300')).to.equal('color: #64b5f6;')
      expect(c()).to.equal('')
      expect(bgc('@primaryOne')).to.equal('background-color: #512da8;')
      expect(bc('#101010')).to.equal('border-color: #101010;')

      expect(d('ib')).to.equal('display: inline-block;')
      expect(d('h')).to.equal('display: hidden;')
      expect(fxd('rrow')).to.equal('flex-direction: reverse-row;')
      expect(fxw('wrapr')).to.equal('flex-wrap: wrap-reverse;')
      expect(fxf('col', 'nowrap')).to.equal('flex-flow: column nowrap;')
      expect(ai('fs')).to.equal('align-items: flex-start;')
      expect(jc('sa')).to.equal('justify-content: space-around;')
      expect(ac('s')).to.equal('align-content: stretch;')
      expect(as('bl')).to.equal('align-self: baseline;')
      expect(ord(2)).to.equal('order: 2;')
      expect(fxg(0.6)).to.equal('flex-grow: 0.6;')
      expect(fxs('inherit')).to.equal('flex-shrink: inherit;')
      expect(fxb('20px')).to.equal('flex-basis: 20px;')
      expect(fx(3, 6, '30%')).to.equal('flex: 3 6 30%;')

      expect(p(1)).to.equal('padding: 0.25rem;')
      expect(p(0, '8px', 32, '80px')).to.equal('padding: 0rem 8px 8rem 80px;')
      expect(pt(12)).to.equal('padding-top: 3rem;')
      expect(pb(13)).to.equal('padding-bottom: 13;')
      expect(pl(4)).to.equal('padding-left: 1rem;')
      expect(pr(20)).to.equal('padding-right: 5rem;')
      expect(py('6')).to.equal('padding: 1.5rem 0;')
      expect(px('100px')).to.equal('padding: 0 100px;')
      expect(m('10%', '20%')).to.equal('margin: 10% 20%;')
      expect(mt(10)).to.equal('margin-top: 2.5rem;')
      expect(mb('inherit')).to.equal('margin-bottom: inherit;')
      expect(ml('auto')).to.equal('margin-left: auto;')
      expect(mr(100)).to.equal('margin-right: 100;')
      expect(my(32)).to.equal('margin: 8rem 0;')
      expect(mx(0)).to.equal('margin: 0 0rem;')
    })
  })
}

