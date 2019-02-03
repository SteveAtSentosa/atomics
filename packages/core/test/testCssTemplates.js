import  { expect } from 'chai'
import { fillCssTemplate } from '../src/utils/cssUtils'
import { mapSpace } from '../src/maps/space'
import { mapColor } from '../src/maps/color'
import { mapDisplay, mapFlex } from '../src/maps/layout'


const tests = [
  [ mapColor,   'red-800',        'color: $1',            'color: #c62828;' ],
  [ mapColor,   'red-800',        'color: ^1',            'color: red-800;' ],
  [ mapColor,   'red',            'color: $1',            'color: red;' ],
  [ mapColor,   'red',            'color: ^1',            'color: red;' ],
  [ mapColor,   ['cyan-300'],     'background-color: $1', 'background-color: #4dd0e1;' ],
  [ mapSpace,   4,                'margin: $1 $2',        'margin: 1rem;' ],
  [ mapSpace,   4,                'margin: $1 ^2',        'margin: 1rem;' ],
  [ mapSpace,   4,                'margin: ^1 $2',        'margin: 4;' ],
  [ mapSpace,   [8, 12],          'padding: $1 $2',       'padding: 2rem 3rem;' ],
  [ mapSpace,   [8, 12, 16],      'padding: $1 $2',       'padding: 2rem 3rem;' ],
  [ mapSpace,   [8, 12],          'padding: $1 $2 $3 ^4', 'padding: 2rem 3rem;' ],
  [ mapSpace,   ['8px', '12px'],  'padding: $1 $2 $3',    'padding: 8px 12px;' ],
  [ mapDisplay, ['ib'],           'display: $1 ^2 ^3',    'display: inline-block;' ],
  [ mapFlex,    ['col', 'wrapr'], 'flex-flow: $1 $2',     'flex-flow: column wrap-reverse;' ],
  [ null,       [1, 2, '100px'],  'flex: ^1 ^2 ^3',       'flex: 1 2 100px;' ]
]

const negTests = [
  [ mapColor, {},  'color: $1',   'color:;' ],
  [ mapSpace,   4,  [],           '' ],
  [ 'notAFunc', 8,  'margin: $1', 'margin: 8;' ],
]

export default function runCssTemplateTests() {
  describe('test css templates', () => {
    it('should fill a css template correctly', () => {
      tests.forEach(t => expect(fillCssTemplate(t[1], t[2], t[0])).to.equal(t[3]))
    })
    it('should handle invalid input for css template fill', () => {
      negTests.forEach(t => expect(fillCssTemplate(t[1], t[2], t[0])).to.equal(t[3]))
    })

  })
}

