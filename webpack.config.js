const path = require('path')
const optimization = require('./webpack/optimization')
const plugins = require('./webpack/plugins')
const cssLoaders = require('./webpack/css-loaders')
const jsLoaders = require('./webpack/js-loaders')
const babelOptions = require('./webpack/babel')
const { filename } = require('./webpack/utils')
const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: [ '@babel/polyfill', './index.js' ],
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  optimization: optimization(),
  devtool: isDev ? 'source-map': '',
  devServer: {
    port: 9000,
    hot: isDev
  },
  plugins: plugins(),
  module: {
    rules: [
      {
        test: /\.css$/,
        use: cssLoaders()
      },
      {
        test: /\.less$/,
        use: cssLoaders('less-loader')
      },
      {
        test: /\.s[ac]ss$/,
        use: cssLoaders('sass-loader')
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: jsLoaders()
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: {
          loader: 'babel-loader',
          options: babelOptions('@babel/preset-typescript')
        }
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: ['file-loader']
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        use: ['file-loader']
      }
    ]
  }
}