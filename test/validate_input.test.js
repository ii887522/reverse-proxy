'use strict';
import validateInput, { validateCommandLineArgs, validateConfig } from '../src/validate_input.js';
test('validate command line with no arguments', () => {
    expect.assertions(2);
    try {
        validateCommandLineArgs(['node', 'index.js']);
    }
    catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe('There must be exactly 1 command line argument passed in! Please try again.');
    }
});
test('validate command line with 2 arguments', () => {
    expect.assertions(2);
    try {
        validateCommandLineArgs(['node', 'index.js', 'a', 'b']);
    }
    catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe('There must be exactly 1 command line argument passed in! Please try again.');
    }
});
test('validate command line with 3 arguments', () => {
    expect.assertions(2);
    try {
        validateCommandLineArgs(['node', 'index.js', 'a', 'b', 'c']);
    }
    catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe('There must be exactly 1 command line argument passed in! Please try again.');
    }
});
test("validate command line with path ends with '/' as the first argument", () => {
    expect.assertions(2);
    try {
        validateCommandLineArgs(['node', 'index.js', 'a/']);
    }
    catch (error) {
        expect(error).toBeInstanceOf(SyntaxError);
        expect(error.message).toBe("Config file path must not ends with '/' or '\\'! Please try again.");
    }
});
test("validate command line with path ends with '\\' as the first argument", () => {
    expect.assertions(2);
    try {
        validateCommandLineArgs(['node', 'index.js', 'a\\']);
    }
    catch (error) {
        expect(error).toBeInstanceOf(SyntaxError);
        expect(error.message).toBe("Config file path must not ends with '/' or '\\'! Please try again.");
    }
});
test('validate command line with non-existent file path as the first argument', () => {
    try {
        validateCommandLineArgs(['node', 'index.js', 'a']);
    }
    catch (error) {
        return;
    }
    fail();
});
test('validate command line with 1 argument', () => validateCommandLineArgs(['node', 'index.js', 'index.js']));
test('validate a number as a config', () => {
    expect.assertions(2);
    try {
        validateConfig(0);
    }
    catch (error) {
        expect(error).toBeInstanceOf(TypeError);
        expect(error.message).toBe('Config should be an object! Please try again.');
    }
});
test('validate config without key path', () => {
    expect.assertions(2);
    try {
        validateConfig({ certPath: 'a', routes: [] });
    }
    catch (error) {
        expect(error).toBeInstanceOf(ReferenceError);
        expect(error.message).toBe('Key path is required in config! Please try again.');
    }
});
test('validate config with number as key path', () => {
    expect.assertions(2);
    try {
        validateConfig({ keyPath: 0, certPath: 'a', routes: [] });
    }
    catch (error) {
        expect(error).toBeInstanceOf(TypeError);
        expect(error.message).toBe('Key path should be a string! Please try again.');
    }
});
test("validate config with key path ends with '/'", () => {
    expect.assertions(2);
    try {
        validateConfig({ keyPath: 'a/', certPath: 'a', routes: [] });
    }
    catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe("Key path must not ends with '/' or '\\'! Please try again.");
    }
});
test("validate config with key path ends with '\\'", () => {
    expect.assertions(2);
    try {
        validateConfig({ keyPath: 'a\\', certPath: 'a', routes: [] });
    }
    catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe("Key path must not ends with '/' or '\\'! Please try again.");
    }
});
test('validate config without cert path', () => {
    expect.assertions(2);
    try {
        validateConfig({ keyPath: 'a', routes: [] });
    }
    catch (error) {
        expect(error).toBeInstanceOf(ReferenceError);
        expect(error.message).toBe('Cert path is required in config! Please try again.');
    }
});
test('validate config with number as cert path', () => {
    expect.assertions(2);
    try {
        validateConfig({ keyPath: 'a', certPath: 0, routes: [] });
    }
    catch (error) {
        expect(error).toBeInstanceOf(TypeError);
        expect(error.message).toBe('Cert path should be a string! Please try again.');
    }
});
test("validate config with cert path ends with '/'", () => {
    expect.assertions(2);
    try {
        validateConfig({ keyPath: 'a', certPath: 'a/', routes: [] });
    }
    catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe("Cert path must not ends with '/' or '\\'! Please try again.");
    }
});
test("validate config with cert path ends with '\\'", () => {
    expect.assertions(2);
    try {
        validateConfig({ keyPath: 'a', certPath: 'a\\', routes: [] });
    }
    catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe("Cert path must not ends with '/' or '\\'! Please try again.");
    }
});
test('validate config without routes', () => {
    expect.assertions(2);
    try {
        validateConfig({ keyPath: 'a', certPath: 'a' });
    }
    catch (error) {
        expect(error).toBeInstanceOf(ReferenceError);
        expect(error.message).toBe('Routes is required in config! Please try again.');
    }
});
test('validate config with an object as routes', () => {
    expect.assertions(2);
    try {
        validateConfig({ keyPath: 'a', certPath: 'a', routes: {} });
    }
    catch (error) {
        expect(error).toBeInstanceOf(TypeError);
        expect(error.message).toBe('Routes should be an array! Please try again.');
    }
});
test('validate config with routes that contains a number', () => {
    expect.assertions(2);
    try {
        validateConfig({ keyPath: 'a', certPath: 'a', routes: [0] });
    }
    catch (error) {
        expect(error).toBeInstanceOf(TypeError);
        expect(error.message).toBe('Route should be an object! Please try again.');
    }
});
test('validate config with empty routes', () => {
    validateConfig({ keyPath: 'a', certPath: 'a', routes: [] });
});
test('validate config with routes that contains a route without hostname', () => {
    expect.assertions(2);
    try {
        validateConfig({ keyPath: 'a', certPath: 'a', routes: [{ target: 'http://localhost:1024' }] });
    }
    catch (error) {
        expect(error).toBeInstanceOf(ReferenceError);
        expect(error.message).toBe('Hostname is required in route! Please try again.');
    }
});
test('validate config with routes that contains a route with a number as a hostname', () => {
    expect.assertions(2);
    try {
        validateConfig({ keyPath: 'a', certPath: 'a', routes: [{ hostname: 0, target: 'http://localhost:1024' }] });
    }
    catch (error) {
        expect(error).toBeInstanceOf(TypeError);
        expect(error.message).toBe('Hostname should be a string! Please try again.');
    }
});
test('validate config with routes that contains a route without target', () => {
    expect.assertions(2);
    try {
        validateConfig({ keyPath: 'a', certPath: 'a', routes: [{ hostname: 'ii887522.dynv6.net' }] });
    }
    catch (error) {
        expect(error).toBeInstanceOf(ReferenceError);
        expect(error.message).toBe('Target is required in route! Please try again.');
    }
});
test('validate config with routes that contains a route with a number as a target', () => {
    expect.assertions(2);
    try {
        validateConfig({ keyPath: 'a', certPath: 'a', routes: [{ hostname: 'ii887522.dynv6.net', target: 0 }] });
    }
    catch (error) {
        expect(error).toBeInstanceOf(TypeError);
        expect(error.message).toBe('Target should be a string! Please try again.');
    }
});
test('validate config with routes that contains a proper route', () => {
    validateConfig({ keyPath: 'a', certPath: 'a', routes: [{ hostname: 'ii887522.dynv6.net', target: 'http://localhost:1024' }] });
});
test('validate config with routes that contains a route without hostname and a proper route', () => {
    expect.assertions(2);
    try {
        validateConfig({ keyPath: 'a', certPath: 'a', routes: [{ target: 'http://localhost:1025' }, { hostname: 'ii887522.dynv6.net', target: 'http://localhost:1024' }] });
    }
    catch (error) {
        expect(error).toBeInstanceOf(ReferenceError);
        expect(error.message).toBe('Hostname is required in route! Please try again.');
    }
});
test('validate config with routes that contains a route with a number as a hostname and a proper route', () => {
    expect.assertions(2);
    try {
        validateConfig({
            keyPath: 'a',
            certPath: 'a',
            routes: [{ hostname: 0, target: 'http://localhost:1025' }, { hostname: 'ii887522.dynv6.net', target: 'http://localhost:1024' }]
        });
    }
    catch (error) {
        expect(error).toBeInstanceOf(TypeError);
        expect(error.message).toBe('Hostname should be a string! Please try again.');
    }
});
test('validate config with routes that contains a route without target and a proper route', () => {
    expect.assertions(2);
    try {
        validateConfig({ keyPath: 'a', certPath: 'a', routes: [{ hostname: 'example.dynv6.net' }, { hostname: 'ii887522.dynv6.net', target: 'http://localhost:1024' }] });
    }
    catch (error) {
        expect(error).toBeInstanceOf(ReferenceError);
        expect(error.message).toBe('Target is required in route! Please try again.');
    }
});
test('validate config with routes that contains a route with a number as a target and a proper route', () => {
    expect.assertions(2);
    try {
        validateConfig({
            keyPath: 'a',
            certPath: 'a',
            routes: [{ hostname: 'example.dynv6.net', target: 0 }, { hostname: 'ii887522.dynv6.net', target: 'http://localhost:1024' }]
        });
    }
    catch (error) {
        expect(error).toBeInstanceOf(TypeError);
        expect(error.message).toBe('Target should be a string! Please try again.');
    }
});
test('validate config with routes that contains a proper route and a route without hostname', () => {
    expect.assertions(2);
    try {
        validateConfig({ keyPath: 'a', certPath: 'a', routes: [{ hostname: 'ii887522.dynv6.net', target: 'http://localhost:1024' }, { target: 'http://localhost:1025' }] });
    }
    catch (error) {
        expect(error).toBeInstanceOf(ReferenceError);
        expect(error.message).toBe('Hostname is required in route! Please try again.');
    }
});
test('validate config with routes that contains a proper route and a route with a number as a hostname', () => {
    expect.assertions(2);
    try {
        validateConfig({
            keyPath: 'a',
            certPath: 'a',
            routes: [{ hostname: 'ii887522.dynv6.net', target: 'http://localhost:1024' }, { hostname: 0, target: 'http://localhost:1025' }]
        });
    }
    catch (error) {
        expect(error).toBeInstanceOf(TypeError);
        expect(error.message).toBe('Hostname should be a string! Please try again.');
    }
});
test('validate config with routes that contains a proper route and a route without target', () => {
    expect.assertions(2);
    try {
        validateConfig({ keyPath: 'a', certPath: 'a', routes: [{ hostname: 'ii887522.dynv6.net', target: 'http://localhost:1024' }, { hostname: 'example.dynv6.net' }] });
    }
    catch (error) {
        expect(error).toBeInstanceOf(ReferenceError);
        expect(error.message).toBe('Target is required in route! Please try again.');
    }
});
test('validate config with routes that contains a proper route and a route with a number as a target', () => {
    expect.assertions(2);
    try {
        validateConfig({
            keyPath: 'a',
            certPath: 'a',
            routes: [{ hostname: 'ii887522.dynv6.net', target: 'http://localhost:1024' }, { hostname: 'example.dynv6.net', target: 0 }]
        });
    }
    catch (error) {
        expect(error).toBeInstanceOf(TypeError);
        expect(error.message).toBe('Target should be a string! Please try again.');
    }
});
test('validate config with routes that contains 2 proper routes', () => {
    validateConfig({
        keyPath: 'a',
        certPath: 'a',
        routes: [{ hostname: 'ii887522.dynv6.net', target: 'http://localhost:1024' }, { hostname: 'example.dynv6.net', target: 'http://localhost:1025' }]
    });
});
test('validate config with routes that contains 3 proper routes', () => {
    validateConfig({
        keyPath: 'a',
        certPath: 'a',
        routes: [
            { hostname: 'ii887522.dynv6.net', target: 'http://localhost:1024' },
            { hostname: 'example.dynv6.net', target: 'http://localhost:1025' },
            { hostname: 'abcdef.dynv6.net', target: 'http://localhost:1026' }
        ]
    });
});
test('validate input without command line arguments', () => {
    try {
        validateInput(['node', 'index.js']);
    }
    catch (error) {
        return;
    }
    fail();
});
test('validate input with proper command line argument but improper config', () => {
    try {
        validateInput(['node', 'index.js', 'test/invalid_reverse_proxy.config.json']);
    }
    catch (error) {
        return;
    }
    fail();
});
test('validate input with proper command line argument and config', () => {
    validateInput(['node', 'index.js', 'test/valid_reverse_proxy.config.json']);
});
