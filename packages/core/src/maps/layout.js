import { noop } from '../utils/typeUtils'
import { makeCssMapFn } from '../utils/cssUtils'


export const displayMap = {
  unit: '',
  vals: {
    b: 'block',
    ib: 'inline-block',
    i: 'inline',
    t: 'table',
    tr: 'table-row',
    tc: 'table-cell',
    h: 'hidden',
    fx: 'flex',
    ifx: 'inline-flex',
  },
}

export const mapDisplay = makeCssMapFn(displayMap)

export const displayAtomicMap = {
  display: { atomicType: 'd', cssTemplate: 'display: $1', cssMapFn: mapDisplay },
}

export const flexMap = {
  unit: '',
  vals: {
    row: 'row',
    rrow: 'reverse-row',
    col: 'column',
    rcol: 'reverse-column',
    wrap: 'wrap',
    nowrap: 'nowrap',
    wrapr: 'wrap-reverse',
    fs: 'flex-start',
    fe: 'flex-end',
    c: 'center',
    sb: 'space-between',
    sa: 'space-around',
    bl: 'baseline',
    s: 'stretch',
  },
}

export const mapFlex = makeCssMapFn(flexMap)

export const flexAtomicMap = {
  flexDirection:  { atomicType: 'fxd',  cssTemplate: 'flex-direction: $1',  cssMapFn: mapFlex },
  flexWrap:       { atomicType: 'fxw',  cssTemplate: 'flex-wrap: $1',       cssMapFn: mapFlex },
  flexFlow:       { atomicType: 'fxf',  cssTemplate: 'flex-flow: $1 $2',    cssMapFn: mapFlex },
  alignItems:     { atomicType: 'ai',   cssTemplate: 'align-items: $1',     cssMapFn: mapFlex },
  justifyContent: { atomicType: 'jc',   cssTemplate: 'justify-content: $1', cssMapFn: mapFlex },
  alignContent:   { atomicType: 'ac',   cssTemplate: 'align-content: $1',   cssMapFn: mapFlex },
  alignSelf:      { atomicType: 'as',   cssTemplate: 'align-self: $1',      cssMapFn: mapFlex },
  order:          { atomicType: 'ord',  cssTemplate: 'order: ^1',           cssMapFn: noop },
  flexGrow:       { atomicType: 'fxg',  cssTemplate: 'flex-grow: ^1',       cssMapFn: noop },
  flexShrink:     { atomicType: 'fxs',  cssTemplate: 'flex-shrink: ^1',     cssMapFn: noop },
  flexBasis:      { atomicType: 'fxb',  cssTemplate: 'flex-basis: ^1',      cssMapFn: noop },
  flex:           { atomicType: 'fx',   cssTemplate: 'flex: ^1 ^2 ^3',      cssMapFn: noop },
}
