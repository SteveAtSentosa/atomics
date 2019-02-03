import React from 'react'
import { hot } from 'react-hot-loader'
import { css } from '@emotion/core'

import at from '@atomics/core'

const App = () => {

  const { c, p, hover, rxSm } = at
  const cStr = css(
    hover(c('blue-100')),
    rxSm(c('red-100'))
  )
  const pStr = css(p(2, 4))
  console.log('cltStr: ', cStr)
  console.log('pStr: ', pStr)

  const arr = [cStr, pStr]

  return (
    <>
      <div css={arr} >
        'I am here'
      </div>
      <div css={pStr} >
        'Yes I am'
      </div>
    </>
  )
}

export default hot(module)(App)


