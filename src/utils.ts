
      /*#######.
     ########",#:
   #########',##".
  ##'##'## .##',##.
   ## ## ## # ##",#.
    ## ## ## ## ##'
     ## ## ## :##
      ## ## ##*/

import { exec as execAsync, ExecOptions } from 'child_process'
import { readFile as readFileAsync, writeFile as writeFileAsync } from 'fs'
import { dir as tmpDir } from 'tmp'

export const exec = (command: string, options: ExecOptions) =>
  new Promise<{ stdout: string; stderr: string }>((resolve, reject) =>
    execAsync(
      command,
      options,
      (err, stdout, stderr) => (err ? reject(err) : resolve({ stdout, stderr }))
    )
  )

export const readFile = (path: string) =>
  new Promise<Buffer>((resolve, reject) =>
    readFileAsync(path, (err, data) => (err ? reject(err) : resolve(data)))
  )

export const writeFile = (path: string, data: string) =>
  new Promise<void>((resolve, reject) =>
    writeFileAsync(path, data, err => (err ? reject(err) : resolve()))
  )

export const createTempDirectory = () =>
  new Promise<string>((resolve, reject) =>
    tmpDir((err, path) => (err ? reject(err) : resolve(path)))
  )
