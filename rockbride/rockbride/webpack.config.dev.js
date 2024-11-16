const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html', // Use your root index.html
      filename: 'index.html', // Output index.html in `dist`
    }),
    new HtmlWebpackPlugin({
      template: './photography.html',  // This is for photography.html
      filename: 'photography.html',  // Output file in dist
    })
  ],
  devServer: {
    static: ['./'], // Serve files from the project root
    liveReload: true,
    hot: true,
    open: true,
  },
});
