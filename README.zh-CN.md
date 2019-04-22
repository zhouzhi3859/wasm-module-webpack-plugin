# WASM Module Webpack Loader
![](https://img.shields.io/badge/version-0.0.4-green.svg?)
![npm](https://img.shields.io/npm/dw/wasm-module-webpack-plugin.svg)
[![](https://img.shields.io/badge/nodejs->=8.0-green.svg?)](https://nodejs.org/en/)
[![](https://img.shields.io/badge/npm->=5.4-blue.svg)](https://www.npmjs.com/)
![](https://img.shields.io/badge/license-MIT-000000.svg)
[![Build Status](https://www.travis-ci.org/zhouzhi3859/wasm-module-webpack-plugin.svg?branch=master)](https://www.travis-ci.org/zhouzhi3859/wasm-from-emscripten-result-loader)

[![NPM](https://nodei.co/npm/wasm-module-webpack-plugin.png)](https://nodei.co/npm/wasm-module-webpack-plugin/)

轻量级 加载含wasm文件的npm模块 的webpack插件 

## 安装
1 运行 `npm i wasm-module-webpack-plugin --save-dev`

2 引入 `wasm-module-webpack-plugin` 模块
```js
const WasmModuleWebpackPlugin = require('wasm-module-webpack-plugin');
```

3 修改 `rules` 相关配置为如下所示
```js
{
  test: /\.m?js$/,
  exclude: /(node_modules|bower_components)/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: ['@babel/preset-env'],
      plugins: [ '@babel/plugin-syntax-dynamic-import', WasmModuleWebpackPlugin.BabelPlugin ]
    }
  }
}
```
4 在 `plugins` 下添加以下配置
```js
plugins: [
  new WasmModuleWebpackPlugin.WebpackPlugin()
]
```
## 示例
参考[点击这里](https://github.com/zhouzhi3859/wasm-module-webpack-plugin/tree/master/example).


## MIT License

Copyright 2018 zhi.zhou

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
