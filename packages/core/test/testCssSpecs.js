import  { expect } from 'chai'
import { cssKeysToSpec } from '../src/utils/cssUtils'

const tests = [
  [ 1,                '1' ],
  [ [1],              '1' ],
  [ [1, 2, 3],        '1:2:3' ],
  [ 'red-300',        'red-300' ],
  [ ['red-300'],      'red-300' ],
  [ [ 1, 2, '30px' ], '1:2:30px' ],
]

export default function runCssSpecTests() {
  describe('test css specs', () => {
    it('should correclty create css specs', () => {
      tests.forEach(t => expect(cssKeysToSpec(t[0])).to.equal(t[1]))
    })
  })
}
