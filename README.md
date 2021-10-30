# reverse-proxy
[![Semantic Versioning 2.0.0](https://img.shields.io/badge/semver-2.0.0-standard.svg)](https://semver.org/)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Linux](https://svgshare.com/i/Zhy.svg)](https://svgshare.com/i/Zhy.svg)
[![Windows](https://svgshare.com/i/ZhY.svg)](https://svgshare.com/i/ZhY.svg)
[![made-with-javascript](https://img.shields.io/badge/Made%20with-JavaScript-ffff00.svg)](https://www.javascript.com)
[![made-with-typescript](https://img.shields.io/badge/Made%20with-TypeScript-0000e0.svg)](https://www.typescriptlang.org/)
[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://lbesson.mit-license.org/)

It is a server that forwards client request to the correct web server for processing, and also forwards server response to the correct web client browser for presentation.

## Table of Contents
- [Coding Style](https://github.com/ii887522/reverse-proxy#coding-style)
- [Prerequisites](https://github.com/ii887522/reverse-proxy#prerequisites)
- [Install dependencies](https://github.com/ii887522/reverse-proxy#install-dependencies)
- [Lint project](https://github.com/ii887522/reverse-proxy#lint-project)
- [Automatically build project on save](https://github.com/ii887522/reverse-proxy#automatically-build-project-on-save)
- [Automatically restart project on change](https://github.com/ii887522/reverse-proxy#automatically-restart-project-on-change)

## Coding Style
This project follows [Javascript Standard Style](https://standardjs.com/). Please familiarize yourself with the rules provided in the coding style and
make sure all the proposed code changes in your commits are conforming to the style before making a merge request. You can also make use of
StandardJS - Javascript Standard Style which is a [Visual Studio Code](https://code.visualstudio.com/) plugin and `npm run lint` command under the
[Lint project](https://github.com/ii887522/reverse-proxy#lint-project) section to support you.

## Prerequisites
- Windows 11 or Linux
- [Visual Studio Code](https://code.visualstudio.com/) with plugins:
  - EditorConfig for VS Code
  - Markdown All in One
  - StandardJS - Javascript Standard Style
  - YAML
- [Node.js 16.10.0](https://nodejs.org/en/) and later

## Install dependencies
```sh
ncu -u && npm install
```

## Lint project
```sh
npm run lint
```

## Automatically build project on save
```sh
npm run build
```

## Automatically restart project on change
```sh
npm start
```
