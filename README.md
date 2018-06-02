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

#### `engine`: `string'

Allows you to use a tex engine other than the default pdflatex engine.

```js
pdflatex(leatexContent, { engine: 'xelatex' }
```

**This option requires that you have the appropriate engine installed.**  See the example [Dockerfile](./Dockerfile).

TypeScript
----------

This package is written in **TypeScript**.

That means the NPM package comes with type definitions included.


License
-------
MIT
