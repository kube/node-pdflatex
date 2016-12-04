
      /*#######.
     ########",#:
   #########',##".
  ##'##'## .##',##.
   ## ## ## # ##",#.
    ## ## ## ## ##'
     ## ## ## :##
      ## ## ##*/

import { join, resolve } from 'path'
import { spawn } from 'child_process'
import { createReadStream } from 'fs'
import { set } from 'monolite'
import { dir as tmpDir } from 'tmp'
import { Readable } from 'stream'
import through = require('through2')

type InputStream = NodeJS.ReadableStream | Readable
type OutputSteam = NodeJS.ReadableStream | Readable

type Options = {
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
      ...texInputs.map(path => resolve(process.cwd(), path)),
      ...TEXINPUTS.split(':')
    ]
      // Append colon to use default paths too
      .join(':')
  )

/**
 * Create a temporary directory for LaTeX files compilation
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
const pdflatex = (source: InputStream, options?: Options): OutputSteam => {
  const result = through()

  createTempDirectory()
    .then(tempPath => {

      // Create pdflatex command with arguments
      // Command reads LaTeX source from STDIN
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

      // Pass source to command
      source.pipe(command.stdin)

      // Hack to prevent compilation to never end
      command.stdout.pipe(through())

      // When compilation is finished
      command.on('exit', code =>
        code === 0 ?
          // Pipe created PDF to result
          createReadStream(join(tempPath, 'texput.pdf')).pipe(result)

          // Emit an error to result
          : result.emit('error', 'Error during LaTeX compilation')
      )
    })

  return result
}

export default pdflatex
