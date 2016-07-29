var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  target: 'web',
  cache: false,
  entry: {
    app: [path.resolve(__dirname, './src/App.jsx')]
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js'
  },
  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js', '.json', '.jsx', '.css', '.scss', '.sass', '.svg', '.styl']
  },
  module: {
    preLoaders: [
      {test: /\.js(|x)$/, exclude: [/node_modules/]}
    ],
    loaders: [
      {test: /\.js(|x)$/, exclude:[/node_modules/], loader: 'babel', query: {presets: ['react','es2015']}},
      {test: /\.(|s)css$/, loaders: ['style-loader', 'css?sourceMap', 'sass?sourceMap']}
    ],
    loader: 'react-hot-loader'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      inject: true
    })
  ]
};
