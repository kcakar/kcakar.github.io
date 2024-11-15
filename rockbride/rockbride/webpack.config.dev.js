const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: ['./'], // Serve files from the project root
    liveReload: true,
    hot: true,
    open: true,
  },
});
