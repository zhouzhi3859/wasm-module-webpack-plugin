const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { WebpackPlugin, BabelPlugin } = require('../index');

module.exports = {
  entry: {
    main: [ path.join(__dirname, './main.js') ],
  },
  output: {
    path: path.join(__dirname, './build'),
    filename: '[name].js',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  resolve: {
    extensions: [ '.js' ],
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        include: [ path.join(__dirname, './gps') ],
        use: {
          loader: 'babel-loader',
          options: {
            presets: [ '@babel/preset-env' ],
            plugins: [ '@babel/plugin-syntax-dynamic-import', BabelPlugin ],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      chunksSortMode: 'dependency',
      template: path.resolve('./example', './index.html'),
    }),
    new WebpackPlugin(),
  ],
};
