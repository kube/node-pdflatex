
      /*#######.
     ########",#:
   #########',##".
  ##'##'## .##',##.
   ## ## ## # ##",#.
    ## ## ## ## ##'
     ## ## ## :##
      ## ## ##*/

import { join } from 'path'
import { spawn } from 'child_process'
import { createReadStream } from 'fs'
import { set } from 'monolite'
import { dir as tmpDir } from 'tmp'
import through = require('through2')

type Readable = NodeJS.ReadableStream

type Options = {
  cwd: string
  texInputs?: string[]
  shellEscape?: boolean
}

/**
 * Create ENV for pdflatex with TEXINPUTS correctly set
 */
const createChildEnv = (texInputs: string[] = []) =>
  // Prepend given texInputs
  set(process.env, _ => _.TEXINPUTS)((TEXINPUTS: string = '') =>
    [
      // Transform relative paths in absolute paths
      ...texInputs.map(path => join(process.cwd(), path)),
      ...TEXINPUTS.split(':')
    ]
      // Append colon to use default paths too
      .join(':')
  )

/**
 * Create a temporary directory for LaTeX file compilation
 */
const createTempDirectory = () =>
  new Promise<string>((resolve, reject) =>
    tmpDir((err, path) =>
      err ? reject(err) : resolve(path)
    )
  )

/**
 * Transform a LaTeX stream into a PDF stream
 */
const pdflatex = (source: Readable, options?: Options): Readable => {
  const result = through()

  createTempDirectory()
    .then(tempPath => {

      const command = spawn(
        'pdflatex',
        [
          ...(options.shellEscape ? ['-shell-escape'] : []),
          '-halt-on-error',
          `-output-directory=${tempPath}`
        ],
        {
          cwd: tempPath,
          env: createChildEnv(options.texInputs)
        }
      )

      command.on('exit', code =>
        code === 0 ?
          // Read created PDF file and pipe to result
          createReadStream(join(tempPath, 'texput.pdf')).pipe(result)

          // Emit an error to result stream
          : result.emit('error', 'Error during LaTeX compilation')
      )

      source.pipe(command.stdin)
    })

  return result
}

export default pdflatex
