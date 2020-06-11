const webpack = require('webpack');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: [
    path.resolve(__dirname, 'client', 'src', 'index.js')
  ],
  output: {
    path: path.resolve(__dirname, 'client', 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './client/dist',
    compress: true,
    proxy: {
      '/': 'http://localhost:3000'
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, 'client', 'src'),
        ],
        loader: 'babel-loader'
      }
    ]
  }
}