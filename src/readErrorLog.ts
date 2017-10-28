
      /*#######.
     ########",#:
   #########',##".
  ##'##'## .##',##.
   ## ## ## # ##",#.
    ## ## ## ## ##'
     ## ## ## :##
      ## ## ##*/

import { join } from 'path'
import { readFile } from './utils'

const isErrorLine = (line: string) => line.length > 0 && line.charAt(0) === '!'

const filterErrorLines = (log: string) =>
  log
    .split('\n')
    .filter(isErrorLine)
    .map(line => line.substring(2))
    .join('\n')

/**
 * Read pdflatex error log
 */
export const readErrorLog = async (dirname: string) => {
  const log = await readFile(join(dirname, 'texput.log'))
  return filterErrorLines(log.toString()) || 'LaTeX Error'
}
