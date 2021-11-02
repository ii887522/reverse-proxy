'use strict';
import cluster from 'cluster';
import { cpus } from 'os';
import constants from './constants.js';
export function spawnWorkers() {
    for (let i = 0; i !== cpus().length; ++i)
        cluster.fork();
}
export function spawnRevivableWorkers() {
    spawnWorkers();
    cluster.on('exit', () => {
        cluster.fork().on('listening', () => {
            process.send?.call(undefined, constants.LISTENING);
        });
    });
}
export function supportIncrementalRestart() {
    let keys = Object.keys(cluster.workers ?? {});
    process.on('SIGINT', () => {
        if (cluster.workers !== undefined)
            cluster.workers[keys.pop() ?? '']?.kill();
    });
    process.on('message', message => {
        if (message !== constants.LISTENING)
            return;
        if (keys.length !== 0 && cluster.workers !== undefined)
            cluster.workers[keys.pop() ?? '']?.kill();
        else
            keys = Object.keys(cluster.workers ?? {});
    });
}
