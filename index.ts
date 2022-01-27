#!/usr/bin/env node

'use strict'

import cluster from 'cluster'
import express from 'express'
import httpProxy from 'http-proxy'
import { readFileSync } from 'fs'
import { createServer } from 'https'
import constants from './src/constants.js'
import validateInput from './src/validate_input.js'
import { spawnRevivableWorkers, supportIncrementalRestart, readObject } from '@ii887522/hydro'
import Config from './src/Config'

function primaryMain (): void {
  validateInput(process.argv)
  spawnRevivableWorkers()
  supportIncrementalRestart()
}

function workerMain (): void {
  const config: Config = readObject(process.argv[constants.configFilePathIndex] ?? '')
  const proxy = httpProxy.createProxyServer()
  createServer(
    { key: readFileSync(config.keyPath), cert: readFileSync(config.certPath) },
    express().use((request, response) => {
      proxy.web(request, response, { target: config.routes.find(route => request.hostname === route.hostname)?.target })
    })
  ).listen(443)
  express().use((request, response) => response.redirect(301, `https://${request.hostname}${request.originalUrl}`)).listen(80)
}

if (cluster.isPrimary) primaryMain()
else workerMain()
