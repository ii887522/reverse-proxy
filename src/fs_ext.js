'use strict';
import { readFileSync } from 'fs';
export function readObject(path) {
    return JSON.parse(readFileSync(path).toString());
}
