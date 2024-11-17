const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
      chunks: ['main'], // Include only main.js
    }),
    new HtmlWebpackPlugin({
      template: './photography.html',
      filename: 'photography.html',
      chunks: ['photography'], // Include only photography.js
    }),
  ],
  devServer: {
    static: path.resolve(__dirname), // Serve files from memory with Webpack
    liveReload: true,
    hot: true,
    open: true,
  },
  resolve: {
    modules: [path.resolve(__dirname, 'node_modules'), 'node_modules'],
  }
});
