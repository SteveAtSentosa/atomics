import { expect } from 'chai'
import {
  isArrOfStr, toStr, isNonEmptyStr, get, getOr,
  isNumOrNonEmptyStr, isStrOrArrayOfStr, unique
} from '../src/utils/typeUtils'

export default function runUtilsTests() {
  describe('utils tests', () => {

    it('should convert to string properly', () => {
      expect(toStr('abc')).to.equal('abc')
      expect(toStr(12)).to.equal('12')
      expect(toStr(234.43)).to.equal('234.43')
    })

    it('get values at path correctly', () => {
      const testObj = { a: { b : { c: { d: 'd' } } } }
      expect(get([], testObj)).to.deep.equal(testObj)
      expect(get(['a'], testObj)).to.deep.equal(testObj.a)
      expect(get(['a', 'b'], testObj)).to.deep.equal(testObj.a.b)
      expect(get(['a', 'b', 'c'], testObj)).to.deep.equal(testObj.a.b.c)
      expect(get(['a', 'b', 'c', 'd'], testObj)).to.equal('d')
      expect(get(['c'], testObj)).to.deep.equal(null)
      expect(get(['a', 'c'], testObj)).to.deep.equal(null)
      expect(get(['a', 'b', 'c', 'e'], testObj)).to.deep.equal(null)
      expect(get('a', testObj)).to.deep.equal(null)
      expect(get(['a'], ['a'])).to.deep.equal(null)
      expect(get(['a'], undefined)).to.deep.equal(null)

      expect(getOr('fb', ['c'], testObj)).to.deep.equal('fb')
      expect(getOr('fb', ['c'], testObj)).to.deep.equal('fb')
    })


    it('should detect types correctly', () => {
      expect(isNonEmptyStr('abc')).to.equal(true)
      expect(isNonEmptyStr('')).to.equal(false)
      expect(isNonEmptyStr([])).to.equal(false)
      expect(isNonEmptyStr({})).to.equal(false)

      expect(isNumOrNonEmptyStr(1)).to.equal(true)
      expect(isNumOrNonEmptyStr(99.99)).to.equal(true)
      expect(isNumOrNonEmptyStr('abc')).to.equal(true)
      expect(isNumOrNonEmptyStr('')).to.equal(false)
      expect(isNumOrNonEmptyStr([])).to.equal(false)
      expect(isNumOrNonEmptyStr({})).to.equal(false)

      // OBSOLETE ?
      // expect(isArrOfStr(['a'])).to.equal(true)
      // expect(isArrOfStr(['1', '2'])).to.equal(true)
      // expect(isArrOfStr(['1', 2])).to.equal(false)
      // expect(isArrOfStr([])).to.equal(true)

      // OBSOLETE ?
      // expect(isStrOrArrayOfStr(['1', '2'])).to.equal(true)
      // expect(isStrOrArrayOfStr('abc')).to.equal(true)
      // expect(isStrOrArrayOfStr(['1', 2])).to.equal(false)
      // expect(isStrOrArrayOfStr(2)).to.equal(false)
    })

    // OBSOLETE ?
    // it('should remove array duplicates correctly', () => {
    //   expect(unique([1, 1, 1, 1])).to.deep.equal([1])
    //   expect(unique(['aaa', 'aaa', 'bbb', 'bbb'])).to.deep.equal(['aaa', 'bbb'])
    //   expect(unique(['1', 1, '1', 1])).to.deep.equal(['1', 1])
    // })

  })
}
