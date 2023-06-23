# JSwaggerSheets
A minimal and native take on CSS-in-JS

- - -
[![CodeQL](https://github.com/shgysk8zer0/jswaggersheets/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/shgysk8zer0/jswaggersheets/actions/workflows/codeql-analysis.yml)
![Node CI](https://github.com/shgysk8zer0/jswaggersheets/workflows/Node%20CI/badge.svg)
![Lint Code Base](https://github.com/shgysk8zer0/jswaggersheets/workflows/Lint%20Code%20Base/badge.svg)

[![GitHub license](https://img.shields.io/github/license/shgysk8zer0/jswaggersheets.svg)](https://github.com/shgysk8zer0/jswaggersheets/blob/master/LICENSE)
[![GitHub last commit](https://img.shields.io/github/last-commit/shgysk8zer0/jswaggersheets.svg)](https://github.com/shgysk8zer0/jswaggersheets/commits/master)
[![GitHub release](https://img.shields.io/github/release/shgysk8zer0/jswaggersheets?logo=github)](https://github.com/shgysk8zer0/jswaggersheets/releases)
[![GitHub Sponsors](https://img.shields.io/github/sponsors/shgysk8zer0?logo=github)](https://github.com/sponsors/shgysk8zer0)

[![npm](https://img.shields.io/npm/v/@shgysk8zer0/jswaggersheets)](https://www.npmjs.com/package/@shgysk8zer0/jswaggersheets)
![node-current](https://img.shields.io/node/v/@shgysk8zer0/jswaggersheets)
![npm bundle size gzipped](https://img.shields.io/bundlephobia/minzip/@shgysk8zer0/jswaggersheets)
[![npm](https://img.shields.io/npm/dw/@shgysk8zer0/jswaggersheets?logo=npm)](https://www.npmjs.com/package/@shgysk8zer0/jswaggersheets)

[![GitHub followers](https://img.shields.io/github/followers/shgysk8zer0.svg?style=social)](https://github.com/shgysk8zer0)
![GitHub forks](https://img.shields.io/github/forks/shgysk8zer0/jswaggersheets.svg?style=social)
![GitHub stars](https://img.shields.io/github/stars/shgysk8zer0/jswaggersheets.svg?style=social)
[![Twitter Follow](https://img.shields.io/twitter/follow/shgysk8zer0.svg?style=social)](https://twitter.com/shgysk8zer0)

[![Donate using Liberapay](https://img.shields.io/liberapay/receives/shgysk8zer0.svg?logo=liberapay)](https://liberapay.com/shgysk8zer0/donate "Donate using Liberapay")
- - -

- [Code of Conduct](./.github/CODE_OF_CONDUCT.md)
- [Contributing](./.github/CONTRIBUTING.md)
<!-- - [Security Policy](./.github/SECURITY.md) -->

## Features

- Minimal and lightweight CSS-in-JS solution
- Utilizes native constructable stylesheets and adopted stylesheets
- Supports CSS Modules-like syntax
- Allows dynamic creation and adoption of stylesheets
- Natively supported technologies for better performance

## Installation

```bash
npm i @shgysk8zer0/jswaggersheets
```

## Example

```js
import * as Swagger from '@shgysk8zer0/jswaggersheets';
import { btnStyles } from './styles.js';

// Set Document-wide styles
Swagger.setStyles(document, {
  '.card': {
      display: 'inline-block',
      border: '1px solid #dadada',
  }
}, { media: 'screen', baseURL: document.baseURL });

// Scoped to a container (Adds a unique id if necessary)
Swagger.addStyles(document.querySelector('.container'), btnStyles);

// Scoped to a web component's ShadowRoot
const el = document.querySelector('.selector');
const shadow = el.attachShadow({ mode: 'closed' });
el.shadowRoot.append(...el.children);
Swagger.addStyles(shadow, btnStyles);
```
