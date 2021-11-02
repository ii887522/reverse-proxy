#!/usr/bin/env node
'use strict';
import cluster from 'cluster';
import express from 'express';
import httpProxy from 'http-proxy';
import { readFile, readFileSync } from 'fs';
import { createServer } from 'https';
import { consume } from '@ii887522/hydro';
import constants from './src/constants.js';
import validateInput from './src/validate_input.js';
import { spawnRevivableWorkers, supportIncrementalRestart } from './src/worker_ext.js';
async function primaryMain() {
    try {
        await validateInput(process.argv);
        spawnRevivableWorkers();
        supportIncrementalRestart();
    }
    catch (error) {
        console.error('reverse-proxy <key-path> <cert-path> <routes-file-path>');
        console.error("key-path: It must exists and must not ends with either '/' or '\\'.");
        console.error("cert-path: It must exists and must not ends with either '/' or '\\'.");
        console.error("routes-file-path: It must exists and must not ends with either '/' or '\\'.");
        process.exit(-1);
    }
}
function workerMain() {
    const routesPromise = new Promise((resolve, reject) => {
        readFile(process.argv[constants.routesFilePathIndex] ?? '', (error, data) => {
            if (error !== null)
                reject(error);
            else
                resolve(JSON.parse(data.toString()));
        });
    });
    const proxy = httpProxy.createProxyServer();
    createServer({ key: readFileSync(process.argv[constants.keyPathIndex] ?? ''), cert: readFileSync(process.argv[constants.certPathIndex] ?? '') }, express().use(async (request, response) => {
        proxy.web(request, response, { target: (await routesPromise).find(route => request.hostname === route.hostname)?.target });
    })).listen(443);
    express().use((request, response) => response.redirect(301, `https://${request.hostname}${request.originalUrl}`)).listen(80);
}
if (cluster.isPrimary)
    consume(primaryMain());
else
    workerMain();
