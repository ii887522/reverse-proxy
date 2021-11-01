'use strict'

import { readFileSync, access } from 'fs'
import constants from './constants.js'

export async function validateCommandLineArgs (commandLineArgs: string[]): Promise<void> {
  if (commandLineArgs.length !== constants.requiredCommandLineArgCount) throw new Error('There must be exactly 3 command line arguments passed in! Please try again.')
  const result = []
  for (let i = constants.firstCommandLineArgIndex; i !== constants.requiredCommandLineArgCount; ++i) {
    if ((commandLineArgs[i]?.endsWith('/') ?? true) || (commandLineArgs[i]?.endsWith('\\') ?? true)) {
      throw new Error("File path must not ends with '/' or '\\'! Please try again.")
    }
    result.push(new Promise<void>((resolve, reject) => access(commandLineArgs[i] ?? '', err => {
      if (err !== null) reject(err)
      else resolve()
    })))
  }
  return await Promise.all(result) as unknown as void // eslint-disable-line @typescript-eslint/no-invalid-void-type
}

export function validateRoutes (routes: any): Array<{ hostname: string, target: string }> {
  if (!Array.isArray(routes)) throw new TypeError('Routes should be an array! Please try again.')
  for (const route of routes) {
    if (typeof route !== 'object') throw new TypeError('Route should be an object! Please try again.')
    if (route.hostname === undefined || route.hostname === null) throw new ReferenceError('Hostname is required in route! Please try again.')
    if (typeof route.hostname !== 'string') throw new TypeError('Hostname should be a string! Please try again.')
    if (route.target === undefined || route.target === null) throw new ReferenceError('Target is required in route! Please try again.')
    if (typeof route.target !== 'string') throw new TypeError('Target should be a string! Please try again.')
  }
  return routes
}

export default async function (commandLineArgs: string[]): Promise<Array<{ hostname: string, target: string }>> {
  await validateCommandLineArgs(commandLineArgs)
  return validateRoutes(JSON.parse(readFileSync(commandLineArgs[constants.routesFilePathIndex] ?? '').toString()))
}
