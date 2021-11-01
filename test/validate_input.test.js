'use strict';
import validateInput, { validateCommandLineArgs, validateRoutes } from '../src/validate_input.js';
test('validate command line with no arguments', async () => {
    expect.assertions(2);
    try {
        await validateCommandLineArgs(['node', 'index.js']);
    }
    catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe('There must be exactly 3 command line arguments passed in! Please try again.');
    }
});
test('validate command line with 1 argument', async () => {
    expect.assertions(2);
    try {
        await validateCommandLineArgs(['node', 'index.js', 'a']);
    }
    catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe('There must be exactly 3 command line arguments passed in! Please try again.');
    }
});
test('validate command line with 2 arguments', async () => {
    expect.assertions(2);
    try {
        await validateCommandLineArgs(['node', 'index.js', 'a', 'b']);
    }
    catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe('There must be exactly 3 command line arguments passed in! Please try again.');
    }
});
test('validate command line with 4 arguments', async () => {
    expect.assertions(2);
    try {
        await validateCommandLineArgs(['node', 'index.js', 'a', 'b', 'c', 'd']);
    }
    catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe('There must be exactly 3 command line arguments passed in! Please try again.');
    }
});
test('validate command line with 5 arguments', async () => {
    expect.assertions(2);
    try {
        await validateCommandLineArgs(['node', 'index.js', 'a', 'b', 'c', 'd', 'e']);
    }
    catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe('There must be exactly 3 command line arguments passed in! Please try again.');
    }
});
test("validate command line with path ends with '/' as the first argument", async () => {
    expect.assertions(2);
    try {
        await validateCommandLineArgs(['node', 'index.js', 'a/', 'b', 'c']);
    }
    catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe("File path must not ends with '/' or '\\'! Please try again.");
    }
});
test("validate command line with path ends with '\\' as the first argument", async () => {
    expect.assertions(2);
    try {
        await validateCommandLineArgs(['node', 'index.js', 'a\\', 'b', 'c']);
    }
    catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe("File path must not ends with '/' or '\\'! Please try again.");
    }
});
test("validate command line with path ends with '/' as the second argument", async () => {
    expect.assertions(2);
    try {
        await validateCommandLineArgs(['node', 'index.js', 'index.js', 'b/', 'c']);
    }
    catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe("File path must not ends with '/' or '\\'! Please try again.");
    }
});
test("validate command line with path ends with '\\' as the second argument", async () => {
    expect.assertions(2);
    try {
        await validateCommandLineArgs(['node', 'index.js', 'index.js', 'b\\', 'c']);
    }
    catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe("File path must not ends with '/' or '\\'! Please try again.");
    }
});
test("validate command line with path ends with '/' as the third argument", async () => {
    expect.assertions(2);
    try {
        await validateCommandLineArgs(['node', 'index.js', 'index.js', 'index.ts', 'c/']);
    }
    catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe("File path must not ends with '/' or '\\'! Please try again.");
    }
});
test("validate command line with path ends with '\\' as the third argument", async () => {
    expect.assertions(2);
    try {
        await validateCommandLineArgs(['node', 'index.js', 'index.js', 'index.ts', 'c\\']);
    }
    catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe("File path must not ends with '/' or '\\'! Please try again.");
    }
});
test('validate command line with non-existent file path as the first argument', async () => {
    try {
        await validateCommandLineArgs(['node', 'index.js', 'a', 'index.ts', 'README.md']);
    }
    catch (error) {
        return;
    }
    fail();
});
test('validate command line with non-existent file path as the second argument', async () => {
    try {
        await validateCommandLineArgs(['node', 'index.js', 'index.js', 'b', 'README.md']);
    }
    catch (error) {
        return;
    }
    fail();
});
test('validate command line with non-existent file path as the third argument', async () => {
    try {
        await validateCommandLineArgs(['node', 'index.js', 'index.js', 'index.ts', 'c']);
    }
    catch (error) {
        return;
    }
    fail();
});
test('validate command line with 3 arguments', async () => await validateCommandLineArgs(['node', 'index.js', 'index.js', 'index.ts', 'README.md']));
test('validate an object as routes', () => {
    expect.assertions(2);
    try {
        validateRoutes({});
    }
    catch (error) {
        expect(error).toBeInstanceOf(TypeError);
        expect(error.message).toBe('Routes should be an array! Please try again.');
    }
});
test('validate empty routes', () => {
    validateRoutes([]);
});
test('validate routes that contains a number', () => {
    expect.assertions(2);
    try {
        validateRoutes([0]);
    }
    catch (error) {
        expect(error).toBeInstanceOf(TypeError);
        expect(error.message).toBe('Route should be an object! Please try again.');
    }
});
test('validate routes that contains an object', () => {
    expect.assertions(2);
    try {
        validateRoutes([{}]);
    }
    catch (error) {
        expect(error).toBeInstanceOf(ReferenceError);
        expect(error.message).toBe('Hostname is required in route! Please try again.');
    }
});
test('validate routes that contains a route with a number as a hostname', () => {
    expect.assertions(2);
    try {
        validateRoutes([{ hostname: 0 }]);
    }
    catch (error) {
        expect(error).toBeInstanceOf(TypeError);
        expect(error.message).toBe('Hostname should be a string! Please try again.');
    }
});
test('validate routes that contains a route with a hostname only', () => {
    expect.assertions(2);
    try {
        validateRoutes([{ hostname: 'ii887522.dynv6.net' }]);
    }
    catch (error) {
        expect(error).toBeInstanceOf(ReferenceError);
        expect(error.message).toBe('Target is required in route! Please try again.');
    }
});
test('validate routes that contains a route with a number as a target', () => {
    expect.assertions(2);
    try {
        validateRoutes([{ target: 0 }]);
    }
    catch (error) {
        expect(error).toBeInstanceOf(ReferenceError);
        expect(error.message).toBe('Hostname is required in route! Please try again.');
    }
});
test('validate routes that contains a route with a target only', () => {
    expect.assertions(2);
    try {
        validateRoutes([{ target: 'https://localhost:1024' }]);
    }
    catch (error) {
        expect(error).toBeInstanceOf(ReferenceError);
        expect(error.message).toBe('Hostname is required in route! Please try again.');
    }
});
test('validate routes that contains a route with a number as a hostname and a number as a target', () => {
    expect.assertions(2);
    try {
        validateRoutes([{ hostname: 0, target: 0 }]);
    }
    catch (error) {
        expect(error).toBeInstanceOf(TypeError);
        expect(error.message).toBe('Hostname should be a string! Please try again.');
    }
});
test('validate routes that contains a route with a hostname and a number as a target', () => {
    expect.assertions(2);
    try {
        validateRoutes([{ hostname: 'ii887522.dynv6.net', target: 0 }]);
    }
    catch (error) {
        expect(error).toBeInstanceOf(TypeError);
        expect(error.message).toBe('Target should be a string! Please try again.');
    }
});
test('validate routes that contains a route with a number as a hostname and a target', () => {
    expect.assertions(2);
    try {
        validateRoutes([{ hostname: 0, target: 'https://localhost:1024' }]);
    }
    catch (error) {
        expect(error).toBeInstanceOf(TypeError);
        expect(error.message).toBe('Hostname should be a string! Please try again.');
    }
});
test('validate routes that contains a route with a hostname and a target', () => {
    validateRoutes([{ hostname: 'ii887522.dynv6.net', target: 'https://localhost:1024' }]);
});
test('validate routes that contains a proper route and a number', () => {
    expect.assertions(2);
    try {
        validateRoutes([{ hostname: 'ii887522.dynv6.net', target: 'https://localhost:1024' }, 0]);
    }
    catch (error) {
        expect(error).toBeInstanceOf(TypeError);
        expect(error.message).toBe('Route should be an object! Please try again.');
    }
});
test('validate routes that contains a proper route and an object', () => {
    expect.assertions(2);
    try {
        validateRoutes([{ hostname: 'ii887522.dynv6.net', target: 'https://localhost:1024' }, {}]);
    }
    catch (error) {
        expect(error).toBeInstanceOf(ReferenceError);
        expect(error.message).toBe('Hostname is required in route! Please try again.');
    }
});
test('validate routes that contains a proper route and a route with a number as a hostname', () => {
    expect.assertions(2);
    try {
        validateRoutes([{ hostname: 'ii887522.dynv6.net', target: 'https://localhost:1024' }, { hostname: 0 }]);
    }
    catch (error) {
        expect(error).toBeInstanceOf(TypeError);
        expect(error.message).toBe('Hostname should be a string! Please try again.');
    }
});
test('validate routes that contains a proper route and a route with a hostname only', () => {
    expect.assertions(2);
    try {
        validateRoutes([{ hostname: 'ii887522.dynv6.net', target: 'https://localhost:1024' }, { hostname: 'ii887522.dynv6.net' }]);
    }
    catch (error) {
        expect(error).toBeInstanceOf(ReferenceError);
        expect(error.message).toBe('Target is required in route! Please try again.');
    }
});
test('validate routes that contains a proper route and a route with a number as a target', () => {
    expect.assertions(2);
    try {
        validateRoutes([{ hostname: 'ii887522.dynv6.net', target: 'https://localhost:1024' }, { target: 0 }]);
    }
    catch (error) {
        expect(error).toBeInstanceOf(ReferenceError);
        expect(error.message).toBe('Hostname is required in route! Please try again.');
    }
});
test('validate routes that contains a proper route and a route with a target only', () => {
    expect.assertions(2);
    try {
        validateRoutes([{ hostname: 'ii887522.dynv6.net', target: 'https://localhost:1024' }, { target: 'https://localhost:1024' }]);
    }
    catch (error) {
        expect(error).toBeInstanceOf(ReferenceError);
        expect(error.message).toBe('Hostname is required in route! Please try again.');
    }
});
test('validate routes that contains a proper route and a route with a number as a hostname and a number as a target', () => {
    expect.assertions(2);
    try {
        validateRoutes([{ hostname: 'ii887522.dynv6.net', target: 'https://localhost:1024' }, { hostname: 0, target: 0 }]);
    }
    catch (error) {
        expect(error).toBeInstanceOf(TypeError);
        expect(error.message).toBe('Hostname should be a string! Please try again.');
    }
});
test('validate routes that contains a proper route and a route with a hostname and a number as a target', () => {
    expect.assertions(2);
    try {
        validateRoutes([{ hostname: 'ii887522.dynv6.net', target: 'https://localhost:1024' }, { hostname: 'ii887522.dynv6.net', target: 0 }]);
    }
    catch (error) {
        expect(error).toBeInstanceOf(TypeError);
        expect(error.message).toBe('Target should be a string! Please try again.');
    }
});
test('validate routes that contains a number and a proper route', () => {
    expect.assertions(2);
    try {
        validateRoutes([0, { hostname: 'ii887522.dynv6.net', target: 'https://localhost:1024' }]);
    }
    catch (error) {
        expect(error).toBeInstanceOf(TypeError);
        expect(error.message).toBe('Route should be an object! Please try again.');
    }
});
test('validate routes that contains an object and a proper route', () => {
    expect.assertions(2);
    try {
        validateRoutes([{}, { hostname: 'ii887522.dynv6.net', target: 'https://localhost:1024' }]);
    }
    catch (error) {
        expect(error).toBeInstanceOf(ReferenceError);
        expect(error.message).toBe('Hostname is required in route! Please try again.');
    }
});
test('validate routes that contains a route with a number as a hostname and a proper route', () => {
    expect.assertions(2);
    try {
        validateRoutes([{ hostname: 0 }, { hostname: 'ii887522.dynv6.net', target: 'https://localhost:1024' }]);
    }
    catch (error) {
        expect(error).toBeInstanceOf(TypeError);
        expect(error.message).toBe('Hostname should be a string! Please try again.');
    }
});
test('validate routes that contains a route with a hostname only and a proper route', () => {
    expect.assertions(2);
    try {
        validateRoutes([{ hostname: 'ii887522.dynv6.net' }, { hostname: 'ii887522.dynv6.net', target: 'https://localhost:1024' }]);
    }
    catch (error) {
        expect(error).toBeInstanceOf(ReferenceError);
        expect(error.message).toBe('Target is required in route! Please try again.');
    }
});
test('validate routes that contains a route with a number as a target and a proper route', () => {
    expect.assertions(2);
    try {
        validateRoutes([{ target: 0 }, { hostname: 'ii887522.dynv6.net', target: 'https://localhost:1024' }]);
    }
    catch (error) {
        expect(error).toBeInstanceOf(ReferenceError);
        expect(error.message).toBe('Hostname is required in route! Please try again.');
    }
});
test('validate routes that contains a route with a target only and a proper route', () => {
    expect.assertions(2);
    try {
        validateRoutes([{ target: 'https://localhost:1024' }, { hostname: 'ii887522.dynv6.net', target: 'https://localhost:1024' }]);
    }
    catch (error) {
        expect(error).toBeInstanceOf(ReferenceError);
        expect(error.message).toBe('Hostname is required in route! Please try again.');
    }
});
test('validate routes that contains a route with a number as a hostname and a number as a target and a proper route', () => {
    expect.assertions(2);
    try {
        validateRoutes([{ hostname: 0, target: 0 }, { hostname: 'ii887522.dynv6.net', target: 'https://localhost:1024' }]);
    }
    catch (error) {
        expect(error).toBeInstanceOf(TypeError);
        expect(error.message).toBe('Hostname should be a string! Please try again.');
    }
});
test('validate routes that contains a route with a hostname and a number as a target and a proper route', () => {
    expect.assertions(2);
    try {
        validateRoutes([{ hostname: 'ii887522.dynv6.net', target: 0 }, { hostname: 'ii887522.dynv6.net', target: 'https://localhost:1024' }]);
    }
    catch (error) {
        expect(error).toBeInstanceOf(TypeError);
        expect(error.message).toBe('Target should be a string! Please try again.');
    }
});
test('validate routes that contains a route with a number as a hostname and a target and a proper route', () => {
    expect.assertions(2);
    try {
        validateRoutes([{ hostname: 0, target: 'https://localhost:1024' }, { hostname: 'ii887522.dynv6.net', target: 'https://localhost:1024' }]);
    }
    catch (error) {
        expect(error).toBeInstanceOf(TypeError);
        expect(error.message).toBe('Hostname should be a string! Please try again.');
    }
});
test('validate routes that contains 2 routes', () => {
    validateRoutes([{ hostname: 'ii887522.dynv6.net', target: 'https://localhost:1024' }, { hostname: 'example.dynv6.net', target: 'https://localhost:1025' }]);
});
test('validate routes that contains 3 routes', () => {
    validateRoutes([
        { hostname: 'ii887522.dynv6.net', target: 'https://localhost:1024' },
        { hostname: 'example.dynv6.net', target: 'https://localhost:1025' },
        { hostname: 'abc.dynv6.net', target: 'https://localhost:1026' }
    ]);
});
test('validate input with non-existent route file path', async () => {
    try {
        await validateInput(['node', 'index.js', 'index.js', 'index.ts', 'a']);
    }
    catch (err) {
        return;
    }
    fail();
});
test('validate input with invalid routes', async () => {
    try {
        await validateInput(['node', 'index.js', 'index.js', 'index.ts', 'test/invalid_routes.json']);
    }
    catch (err) {
        return;
    }
    fail();
});
test('validate input with valid routes', async () => {
    await validateInput(['node', 'index.js', 'index.js', 'index.ts', 'test/valid_routes.json']);
});
