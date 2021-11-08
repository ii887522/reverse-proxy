'use strict'

export default interface Config {
  keyPath: string
  certPath: string
  routes: Array<{ hostname: string, target: string }>
}
