# reverse-proxy
[![Semantic Versioning 2.0.0](https://img.shields.io/badge/semver-2.0.0-standard.svg)](https://semver.org/)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Linux](https://svgshare.com/i/Zhy.svg)](https://svgshare.com/i/Zhy.svg)
[![Windows](https://svgshare.com/i/ZhY.svg)](https://svgshare.com/i/ZhY.svg)
[![made-with-javascript](https://img.shields.io/badge/Made%20with-JavaScript-ffff00.svg)](https://www.javascript.com)
[![made-with-typescript](https://img.shields.io/badge/Made%20with-TypeScript-0000e0.svg)](https://www.typescriptlang.org/)
[![Npm package version](https://badgen.net/npm/v/@ii887522/reverse-proxy)](https://www.npmjs.com/package/@ii887522/reverse-proxy)
[![Npm package daily downloads](https://badgen.net/npm/dm/@ii887522/reverse-proxy)](https://npmjs.com/package/@ii887522/reverse-proxy)
[![Npm package license](https://badgen.net/npm/license/@ii887522/reverse-proxy)](https://npmjs.com/package/@ii887522/reverse-proxy)
[![Npm package dependents](https://badgen.net/npm/dependents/@ii887522/reverse-proxy)](https://npmjs.com/package/@ii887522/reverse-proxy)

It is a server that forwards client request to the correct web server for processing, and also forwards server response to the correct web client browser for presentation.

## Table of contents
- [Usage](https://github.com/ii887522/reverse-proxy#usage)
- [Coding style](https://github.com/ii887522/reverse-proxy#coding-style)
- [Prerequisites](https://github.com/ii887522/reverse-proxy#prerequisites)
- [Install dependencies](https://github.com/ii887522/reverse-proxy#install-dependencies)
- [Lint the project](https://github.com/ii887522/reverse-proxy#lint-the-project)
- [Build the project](https://github.com/ii887522/reverse-proxy#build-the-project)
- [Automatically build the project on save](https://github.com/ii887522/reverse-proxy#automatically-build-the-project-on-save)
- [Automatically restart the project on change](https://github.com/ii887522/reverse-proxy#automatically-restart-the-project-on-change)
- [Start the project](https://github.com/ii887522/reverse-proxy#start-the-project)
- [Test the project with code coverage analysis](https://github.com/ii887522/reverse-proxy#test-the-project-with-code-coverage-analysis)
- [Automatically test the project with code coverage analysis on change](https://github.com/ii887522/reverse-proxy#Automatically-test-the-project-with-code-coverage-analysis-on-change)

## Usage
```sh
reverse-proxy <config-file-path>
```
`config-file-path`: It must exists and must not ends with either '/' or '\\'.

A config file passed in must follow the format below:
```json
{
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
}
```

### **Usage example**
```json
{
  "keyPath": "test/key.pem",
  "certPath": "test/cert.pem",
  "routes": [
    {
      "hostname": "example.dynv6.net",
      "target": "http://localhost:1024"
    },
    {
      "hostname": "www.example.dynv6.net",
      "target": "http://localhost:1024"
    },
    {
      "hostname": "abcdefg.dynv6.net",
      "target": "http://localhost:1025"
    },
    {
      "hostname": "www.abcdefg.dynv6.net",
      "target": "http://localhost:1025"
    }
  ]
}
```

## Coding style
This project follows [Javascript Standard Style](https://standardjs.com/). Please familiarize yourself with the rules provided in the coding style and
make sure all the proposed code changes in your commits are conforming to the style before making a merge request. You can also make use of
StandardJS - Javascript Standard Style which is a [Visual Studio Code](https://code.visualstudio.com/) plugin and `npm run lint` command under the
[Lint the project](https://github.com/ii887522/reverse-proxy#lint-the-project) section to support you.

## Prerequisites
- Windows 11 or Linux
- [Visual Studio Code](https://code.visualstudio.com/) with plugins:
  - EditorConfig for VS Code
  - Markdown All in One
  - StandardJS - Javascript Standard Style
  - YAML
- [Node.js 16.13.2](https://nodejs.org/en/) and later

## Install dependencies
```sh
npm install
```

## Lint the project
```sh
npm run lint
```

## Build the project
```sh
npm run build
```

## Automatically build the project on save
```sh
npm run build:watch
```

## Automatically restart the project on change
```sh
npm run dev <config-file-path>
```

## Start the project
```sh
npm start <config-file-path>
```

## Test the project with code coverage analysis
```sh
npm test
```

## Automatically test the project with code coverage analysis on change
```sh
npm run test:watch
```
