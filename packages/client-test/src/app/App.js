import React from 'react'
import { flatten } from 'ramda'
import { isObject, isString } from 'ramda-adjunct'
import { hot } from 'react-hot-loader'
import { css } from '@emotion/core'

import atomics from '@atomics/core'
const { setCssMapFn, at } = atomics

setCssMapFn(css)

const getCss = css =>
  isString(css) ? css :
  isObject(css) ? css.styles :
  'no css string found'

const App = () => {

  // Atomics - truly funtional css
  const { c, bgc, p, m, fz, pos, top, lh, hover, rxMd, rxLg, molecules } = atomics
  const { size } = molecules

  const st = {

    demo: at(
      // fonstSize     color           padding
      // |             |               |
      fz('base'),    c('red-600'),   p(1, 2),   // mobile first
      rxMd(fz('xl'), c('green-600'), p(2, 4)),  // responsive medium screen
      rxLg(fz('2xl'), c('grey-400'), p(4, 8)),  // responsive large screen
      hover(c('blue-600')),                     // state variant
    ),

    cssContainer: at(
      pos('fixed'), top('120px'), p(4), m(4), bgc('teal-600'), c('grey-300'), lh('normal'), size('500px', '250px')
    )
  }

  console.log('st: ', st)


  // using emotion's css prop for styling
  return (
    <>
      <div css={st.demo} > I am here </div>
      <div css={st.demo} > Yes I am </div>

      <div css={st.cssContainer}>
        {flatten(st.demo).map((css, i) => <div key={i}>{getCss(css)}</div>)}
      </div>
    </>
  )
}




export default hot(module)(App)
