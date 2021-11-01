#!/usr/bin/env node

'use strict'

import express from 'express'
import httpProxy from 'http-proxy'
import { readFileSync } from 'fs'
import { createServer } from 'https'
import constants from './src/constants.js'
import validateInput from './src/validate_input.js'

const routesPromise = validateInput(process.argv).catch(() => {
  console.error('reverse-proxy <key-path> <cert-path> <routes-file-path>')
  console.error("key-path: It must exists and must not ends with either '/' or '\\'.")
  console.error("cert-path: It must exists and must not ends with either '/' or '\\'.")
  console.error("routes-file-path: It must exists and must not ends with either '/' or '\\'.")
  process.exit(-1)
})
const proxy = httpProxy.createProxyServer()
createServer(
  { key: readFileSync(process.argv[constants.keyPathIndex] ?? ''), cert: readFileSync(process.argv[constants.certPathIndex] ?? '') },
  express().use(async (request, response) => {
    proxy.web(request, response, { target: (await routesPromise).find(route => request.hostname === route.hostname)?.target })
  })
).listen(443)
