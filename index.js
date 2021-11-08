#!/usr/bin/env node
'use strict';
import cluster from 'cluster';
import express from 'express';
import httpProxy from 'http-proxy';
import { readFileSync } from 'fs';
import { createServer } from 'https';
import { consume } from '@ii887522/hydro';
import constants from './src/constants.js';
import validateInput from './src/validate_input.js';
import { spawnRevivableWorkers, supportIncrementalRestart } from './src/worker_ext.js';
import { readObject } from './src/fs_ext.js';
async function primaryMain() {
    try {
        await validateInput(process.argv);
        spawnRevivableWorkers();
        supportIncrementalRestart();
    }
    catch (error) {
        console.error('reverse-proxy <config-file-path>');
        console.error("config-file-path: It must exists and must not ends with either '/' or '\\'.");
        console.error();
        console.error('A config file passed in must follow the format below:');
        console.error(String.raw `{
  "keyPath": {
    "type": "string",
    "required": true,
    "format": "[^/\\]$"
  },
  "certPath": {
    "type": "string",
    "required": true,
    "format": "[^/\\]$"
  },
  "routes": {
    "type": "array",
    "required": true,
    "value": [
      {
        "hostname": {
          "type": "string",
          "required": true
        },
        "target": {
          "type": "string",
          "required": true
        }
      }
    ]
  }
}`);
        process.exit(-1);
    }
}
function workerMain() {
    const config = readObject(process.argv[constants.configFilePathIndex] ?? '');
    const proxy = httpProxy.createProxyServer();
    createServer({ key: readFileSync(config.keyPath), cert: readFileSync(config.certPath) }, express().use(async (request, response) => {
        proxy.web(request, response, { target: config.routes.find(route => request.hostname === route.hostname)?.target });
    })).listen(443);
    express().use((request, response) => response.redirect(301, `https://${request.hostname}${request.originalUrl}`)).listen(80);
}
if (cluster.isPrimary)
    consume(primaryMain());
else
    workerMain();
