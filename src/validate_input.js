'use strict';
import { accessSync } from 'fs';
import { readObject } from '@ii887522/hydro';
import constants from './constants.js';
export function validateCommandLineArgs(commandLineArgs) {
    if (commandLineArgs.length !== constants.requiredCommandLineArgCount)
        throw new Error('There must be exactly 1 command line argument passed in! Please try again.');
    if ((commandLineArgs[constants.configFilePathIndex]?.endsWith('/') ?? true) || (commandLineArgs[constants.configFilePathIndex]?.endsWith('\\') ?? true)) {
        throw new SyntaxError("Config file path must not ends with '/' or '\\'! Please try again.");
    }
    accessSync(commandLineArgs[constants.configFilePathIndex] ?? '');
}
export function validateConfig(config) {
    if (typeof config !== 'object')
        throw new TypeError('Config should be an object! Please try again.');
    if (config.keyPath === undefined || config.keyPath === null)
        throw new ReferenceError('Key path is required in config! Please try again.');
    if (typeof config.keyPath !== 'string')
        throw new TypeError('Key path should be a string! Please try again.');
    if (config.keyPath.endsWith('/') || config.keyPath.endsWith('\\'))
        throw new Error("Key path must not ends with '/' or '\\'! Please try again.");
    if (config.certPath === undefined || config.certPath === null)
        throw new ReferenceError('Cert path is required in config! Please try again.');
    if (typeof config.certPath !== 'string')
        throw new TypeError('Cert path should be a string! Please try again.');
    if (config.certPath.endsWith('/') || config.certPath.endsWith('\\'))
        throw new Error("Cert path must not ends with '/' or '\\'! Please try again.");
    if (config.routes === undefined || config.routes === null)
        throw new ReferenceError('Routes is required in config! Please try again.');
    if (!Array.isArray(config.routes))
        throw new TypeError('Routes should be an array! Please try again.');
    for (const route of config.routes) {
        if (typeof route !== 'object')
            throw new TypeError('Route should be an object! Please try again.');
        if (route.hostname === undefined || route.hostname === null)
            throw new ReferenceError('Hostname is required in route! Please try again.');
        if (typeof route.hostname !== 'string')
            throw new TypeError('Hostname should be a string! Please try again.');
        if (route.target === undefined || route.target === null)
            throw new ReferenceError('Target is required in route! Please try again.');
        if (typeof route.target !== 'string')
            throw new TypeError('Target should be a string! Please try again.');
    }
    return config;
}
export default function (commandLineArgs) {
    validateCommandLineArgs(commandLineArgs);
    return validateConfig(readObject(commandLineArgs[constants.configFilePathIndex] ?? ''));
}
