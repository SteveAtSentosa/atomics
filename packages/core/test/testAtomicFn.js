import  { expect } from 'chai'
import { spacingAtomicMap } from '../src/maps/space'
import { flexAtomicMap, displayAtomicMap } from '../src/maps/layout'
import { colorAtomicMap } from '../src/maps/color'
import { mapAtomicFns, at } from '../src/utils/atomicUtils'


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

      expect(at(c('blue-300'))).to.deep.equal(['color: #64b5f6;'])
      expect(at(c())).to.deep.equal([''])
      expect(at(bgc('@primaryOne'))).to.deep.equal(['background-color: #512da8;'])
      expect(at(bc('#101010'))).to.deep.equal(['border-color: #101010;'])

      expect(at(d('ib'))).to.deep.equal(['display: inline-block;'])
      expect(at(d('h'))).to.deep.equal(['display: hidden;'])
      expect(at(fxd('rrow'))).to.deep.equal(['flex-direction: reverse-row;'])
      expect(at(fxw('wrapr'))).to.deep.equal(['flex-wrap: wrap-reverse;'])
      expect(at(fxf('col', 'nowrap'))).to.deep.equal(['flex-flow: column nowrap;'])
      expect(at(ai('fs'))).to.deep.equal(['align-items: flex-start;'])
      expect(at(jc('sa'))).to.deep.equal(['justify-content: space-around;'])
      expect(at(ac('s'))).to.deep.equal(['align-content: stretch;'])
      expect(at(as('bl'))).to.deep.equal(['align-self: baseline;'])
      expect(at(ord(2))).to.deep.equal(['order: 2;'])
      expect(at(fxg(0.6))).to.deep.equal(['flex-grow: 0.6;'])
      expect(at(fxs('inherit'))).to.deep.equal(['flex-shrink: inherit;'])
      expect(at(fxb('20px'))).to.deep.equal(['flex-basis: 20px;'])
      expect(at(fx(3, 6, '30%'))).to.deep.equal(['flex: 3 6 30%;'])

      expect(at(p(1))).to.deep.equal(['padding: 0.25rem;'])
      expect(at(p(0, '8px', 32, '80px'))).to.deep.equal(['padding: 0rem 8px 8rem 80px;'])
      expect(at(pt(12))).to.deep.equal(['padding-top: 3rem;'])
      expect(at(pb(13))).to.deep.equal(['padding-bottom: 13;'])
      expect(at(pl(4))).to.deep.equal(['padding-left: 1rem;'])
      expect(at(pr(20))).to.deep.equal(['padding-right: 5rem;'])
      expect(at(py('6'))).to.deep.equal(['padding: 1.5rem 0;'])
      expect(at(px('100px'))).to.deep.equal(['padding: 0 100px;'])
      expect(at(m('10%', '20%'))).to.deep.equal(['margin: 10% 20%;'])
      expect(at(mt(10))).to.deep.equal(['margin-top: 2.5rem;'])
      expect(at(mb('inherit'))).to.deep.equal(['margin-bottom: inherit;'])
      expect(at(ml('auto'))).to.deep.equal(['margin-left: auto;'])
      expect(at(mr(100))).to.deep.equal(['margin-right: 100;'])
      expect(at(my(32))).to.deep.equal(['margin: 8rem 0;'])
      expect(at(mx(0))).to.deep.equal(['margin: 0 0rem;'])
    })
  })
}

