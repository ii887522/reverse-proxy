'use strict'

import { readFileSync } from 'fs'

export function readObject (path: string): any {
  return JSON.parse(readFileSync(path).toString())
}
