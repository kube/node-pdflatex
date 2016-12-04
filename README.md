node-pdflatex
=============
> LaTeX PDF wrapper for Node. Using Streams.


Install
-------
```sh
npm install node-pdflatex
```

Usage
-----

`pdflatex` takes a stream as input and returns a stream as output.

```js
import pdflatex from 'node-pdflatex'
import { createReadStream } from 'fs'

const latexStream = createReadStream('document.tex')

pdflatex(latexStream)
```


### Options

#### `shellEscape`: `boolean`

Adds the `-shell-escape` flag during compilation.

```js
pdflatex(latexStream, { shellEscape: true })
```

#### `texInputs`: `Array<string>`

Adds paths to `TEXINPUTS` env var during compilation.

```js
pdflatex(latexStream, { texInputs: ['../resources/'] })
```


TypeScript
----------

This package is written in **TypeScript**.

That means the NPM package comes with type definitions included.


License
-------
MIT
