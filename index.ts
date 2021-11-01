#!/usr/bin/env node

'use strict'

import express from 'express'
import httpProxy from 'http-proxy'
import { readFileSync } from 'fs'
import https, { createServer } from 'https'
import constants from './src/constants.js'
import validateInput from './src/validate_input.js'

const routesPromise = validateInput(process.argv).catch(() => {
  console.error('reverse-proxy <server-key-path> <server-cert-path> <client-cert-path> <routes-file-path>')
  console.error("server-key-path: It must exists and must not ends with either '/' or '\\'.")
  console.error("server-cert-path: It must exists and must not ends with either '/' or '\\'.")
  console.error("client-cert-path: It must exists and must not ends with either '/' or '\\'.")
  console.error("routes-file-path: It must exists and must not ends with either '/' or '\\'.")
  process.exit(-1)
})
const proxy = httpProxy.createProxyServer({ changeOrigin: true, secure: true, agent: new https.Agent({ ca: readFileSync(process.argv[constants.clientCertPathIndex] ?? '') }) })
createServer(
  { key: readFileSync(process.argv[constants.serverKeyPathIndex] ?? ''), cert: readFileSync(process.argv[constants.serverCertPathIndex] ?? '') },
  express().use(async (request, response) => {
    proxy.web(request, response, { target: (await routesPromise).find(route => request.hostname === route.hostname)?.target })
  })
).listen(443)
