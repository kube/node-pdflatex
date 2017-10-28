
      /*#######.
     ########",#:
   #########',##".
  ##'##'## .##',##.
   ## ## ## # ##",#.
    ## ## ## ## ##'
     ## ## ## :##
      ## ## ##*/

import pdfLatex from '..'

const VALID_SOURCE = `
\\documentclass{article}
\\begin{document}
Hello World!
\\end{document}
`

it('works', async next => {
  await pdfLatex(VALID_SOURCE)
  next()
})
