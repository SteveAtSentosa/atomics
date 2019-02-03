# WIP

Atomics aims at creating a truely functional and completely reactive CSS tool kit.

This is work in progress, but lets just say that this function call:

```javascript
atx(
  d('fx'), fxd('col'), p(0), m(0), c('black'), bgc('@primaryOne'),
  hover(c('@standOut'), bgc('grey:100')),
  rxMd(p(1), m(1), fxd('row')),
  rxLg(p(2), m(2), fxd('row'))
);
```

generates this:

```javascript
[ 'display: flex;',
  'flex-direction: column;',
  'padding: 0rem;',
  'margin: 0rem;',
  'color: #22292f;',
  'background-color: #512da8;',
  '&:hover { color: #00acc1; };',
  '&:hover { background-color: #f5f5f5; };',
  '@media (min-width: 768px) { padding: 0.25rem; };',
  '@media (min-width: 768px) { margin: 0.25rem; };',
  '@media (min-width: 768px) { flex-direction: row; };',
  '@media (min-width: 992px) { padding: 0.5rem; };',
  '@media (min-width: 992px) { margin: 0.5rem; };',
  '@media (min-width: 992px) { flex-direction: row; };' ]
```

... a list of styling directives which can be used in conjunction with css in js libraries such as [emotion](https://github.com/emotion-js/emotion), for example

```html
<div css={atx(
  d('fx'), fxd('col'), p(0), m(0), c('black'), bgc('@primaryOne'),
  hover(c('@standOut'), bgc('grey:100')),
  rxMd(p(1), m(1), fxd('row')),
  rxLg(p(2), m(2), fxd('row'))
)}>
  Some text
</div>
```
