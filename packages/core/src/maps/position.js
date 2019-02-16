import { noop } from '../utils/typeUtils'
import { makeCssMapFn } from '../utils/cssUtils'

export const positionMap = {
  unit: '',
  vals: {
    stc: 'static',
    rel: 'relative',
    abs: 'absolute',
    fxd: 'fixed',
    stk: 'sticky',
    lft: 'left',
    rt: 'right',
    ctr: 'center',
    none: 'none',
    both: 'both',
    is: 'inline-start',
    ie: 'inline-end',
    j: 'justify',
    ja: 'justify-all',
    st: 'start',
    end: 'end',
    mp: 'match-parent',
    top: 'top',
    mid: 'middle',
    bot: 'bottom',
    bl: 'baseline',
    sb: 'sub',
    sp: 'super',
    tt: 'text-top',
    tb: 'text-bottom',
    is: 'inline-start',
    ie: 'inline-end',
    cb: 'content-box',
    bb: 'border-box'
  }
}

export const mapPosition = makeCssMapFn(positionMap)

export const positionAtomicMap = {
  position:      { atomicType: 'pos',  cssTemplate: 'position: $1',       cssMapFn: mapPosition },
  float:         { atomicType: 'flt',  cssTemplate: 'float: $1',          cssMapFn: mapPosition },
  textAlign:     { atomicType: 'ta',   cssTemplate: 'text-align: $1',     cssMapFn: mapPosition },
  verticalAlign: { atomicType: 'va',   cssTemplate: 'vertical-align: $1', cssMapFn: mapPosition },
  clear:         { atomicType: 'clr',  cssTemplate: 'clear: $1',          cssMapFn: mapPosition },
  boxSizing:     { atomicType: 'bxs',  cssTemplate: 'box-sizing: $1',     cssMapFn: mapPosition },
  top:           { atomicType: 'top',  cssTemplate: 'top: ^1',            cssMapFn: noop },
  bottom:        { atomicType: 'bot',  cssTemplate: 'bottom: ^1',         cssMapFn: noop },
  right:         { atomicType: 'rt',   cssTemplate: 'right: ^1',          cssMapFn: noop },
  left:          { atomicType: 'lft',  cssTemplate: 'left: ^1',           cssMapFn: noop },
  content:       { atomicType: 'co',   cssTemplate: 'content: ^1',        cssMapFn: noop },
}
