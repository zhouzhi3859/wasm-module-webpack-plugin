const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WasmPlugin = require('../lib/webpack-plugin');
const BabelPlugin = require('../lib/babel-plugin');

module.exports = {
  // mode: 'production',
  entry: {
        main: [path.join(__dirname, './main.js')]
    },
    output: {
        path: path.join(__dirname, './build'),
        filename: '[name].js',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    resolve: {
        extensions: ['.js']
    },
    module: {
        rules: [
          {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              // options: {
              //   presets: ['@babel/preset-env'],
              //   plugins: [  '@babel/plugin-syntax-dynamic-import', path.join(__dirname, '../lib/fetch-wasm'), '@babel/plugin-transform-runtime' ]
              // }
              options: {
                presets: ['@babel/preset-env'],
                plugins: [ '@babel/plugin-syntax-dynamic-import', BabelPlugin ]
              }
            }
          }
        ]
    },
  plugins: [
    new HtmlWebpackPlugin({
      chunksSortMode: 'dependency',
      template: path.resolve('./example', './index.html'),
    }),
    new WasmPlugin()
  ],
};
