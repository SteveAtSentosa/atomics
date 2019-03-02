import { expect } from 'chai'
import { mapSpace } from '../src/maps/space'
import { mapDisplay, mapFlex } from '../src/maps/layout'
import { mapColor } from '../src/maps/color'

export default function runCssMapTests() {
  describe('CSS Mapping tests', () => {

    it('should map space correctly', () => {
      expect(mapSpace(0)).to.equal('0rem')
      expect(mapSpace(5)).to.equal('1.25rem')
      expect(mapSpace(32)).to.equal('8rem')
      expect(mapSpace('100px')).to.equal('100px')
      expect(mapSpace(48)).to.equal('48')
      expect(mapSpace({})).to.equal('')
    })

    it('should map display correctly', () => {
      expect(mapDisplay('b')).to.equal('block')
      expect(mapDisplay('t')).to.equal('table')
      expect(mapDisplay('fx')).to.equal('flex')
      expect(mapDisplay('rouge')).to.equal('rouge')
      expect(mapDisplay([])).to.equal('')
    })

    it('should map flex correctly', () => {
      expect(mapFlex('rrow')).to.equal('reverse-row')
      expect(mapFlex('sb')).to.equal('space-between')
      expect(mapFlex('wrap')).to.equal('wrap')
      expect(mapFlex('bl')).to.equal('baseline')
      expect(mapFlex('rouge')).to.equal('rouge')
      expect(mapFlex()).to.equal('')
    })

    it('should map colors correctly', () => {
      expect(mapColor('white')).to.equal('#ffffff')
      expect(mapColor('blue-a200')).to.equal('#448aff')
      expect(mapColor('primaryOne')).to.equal('#512da8')
      expect(mapColor('complimentaryTwo')).to.equal('#00acc1')
      expect(mapColor('#customcolor')).to.equal('#customcolor')
      expect(mapColor({})).to.equal('')



    })
  })
}
