const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { WebpackPlugin, BabelPlugin } = require('../index');

module.exports = {
  entry: {
    main: [ '@babel/polyfill', path.join(__dirname, './main.js') ],
  },
  output: {
    path: path.join(__dirname, './build'),
    filename: 'js/[name].js',
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
        include: [ __dirname, path.join(process.cwd(), './node_modules/@ne_fe/gis') ],
        use: [
          {
            loader: 'babel-loader',
            options: {
              // cacheDirectory: true,
              presets: [
                [
                  '@babel/preset-react',
                  {
                    development: process.env.NODE_ENV === 'development',
                  },
                ],
                '@babel/preset-env',
              ],
              plugins: [
                BabelPlugin,
                // '@babel/plugin-transform-runtime',
                '@babel/plugin-syntax-dynamic-import',
              ],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve('./example', './index.html'),
    }),
    new WebpackPlugin(),
  ],
};
