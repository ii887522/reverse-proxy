'use strict'

import Route from './Route.js'

export default interface Config {
  keyPath: string
  certPath: string
  routes: Route[]
}
