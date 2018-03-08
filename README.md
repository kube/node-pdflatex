node-pdflatex
=============
> PDFLaTeX wrapper for Node


Install
-------
```sh
npm install node-pdflatex
```

Usage
-----

`pdflatex` takes latex source and returns a Promise of Buffer.

```js
import pdflatex from 'node-pdflatex'

const source = `
\\documentclass{article}
\\begin{document}
Hello World!
\\end{document}
`

const pdf = await pdflatex(source)
```

### Options

#### `engine`: `string`

Changes which LaTeX engine is used (such as `pdflatex`, `xelatex`, etc.).

```js
pdflatex(latexContent, { engine: 'xelatex' })
```

#### `shellEscape`: `boolean`

Adds the `-shell-escape` flag during compilation.

```js
pdflatex(latexContent, { shellEscape: true })
```

#### `texInputs`: `Array<string>`

Adds paths to `TEXINPUTS` env var during compilation.

```js
pdflatex(latexContent, { texInputs: ['../resources/'] })
```


TypeScript
----------

This package is written in **TypeScript**.

That means the NPM package comes with type definitions included.


License
-------
MIT
