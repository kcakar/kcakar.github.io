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
      template: './en/index.html',
      filename: 'en/index.html',
      chunks: ['main'], // Include only main.js
    }),
    new HtmlWebpackPlugin({
      template: './es/index.html',
      filename: 'es/index.html',
      chunks: ['main'], // Include only main.js
    }),
    new HtmlWebpackPlugin({
      template: './tr/index.html',
      filename: 'tr/index.html',
      chunks: ['main'], // Include only main.js
    }),
    new HtmlWebpackPlugin({
      template: './fr/index.html',
      filename: 'fr/index.html',
      chunks: ['main'], // Include only main.js
    }),
    new HtmlWebpackPlugin({
      template: './photography.html',
      filename: 'photography',
      chunks: ['photography'], // Include only photography.js
    }), new HtmlWebpackPlugin({
      template: './en/photography.html',
      filename: 'en/photography',
      chunks: ['photography'], // Include only photography.js
    }), new HtmlWebpackPlugin({
      template: './es/photography.html',
      filename: 'es/photography',
      chunks: ['photography'], // Include only photography.js
    }), new HtmlWebpackPlugin({
      template: './tr/photography.html',
      filename: 'tr/photography',
      chunks: ['photography'], // Include only photography.js
    }), new HtmlWebpackPlugin({
      template: './fr/photography.html',
      filename: 'fr/photography',
      chunks: ['photography'], // Include only photography.js
    }),
    new HtmlWebpackPlugin({
      template: './contact.html',
      filename: 'contact',
      chunks: ['contact'], // Include only photography.js
    }), new HtmlWebpackPlugin({
      template: './en/contact.html',
      filename: 'en/contact',
      chunks: ['contact'], // Include only photography.js
    }), new HtmlWebpackPlugin({
      template: './es/contact.html',
      filename: 'es/contact',
      chunks: ['contact'], // Include only photography.js
    }), new HtmlWebpackPlugin({
      template: './tr/contact.html',
      filename: 'tr/contact',
      chunks: ['contact'], // Include only photography.js
    }), new HtmlWebpackPlugin({
      template: './fr/contact.html',
      filename: 'fr/contact',
      chunks: ['contact'], // Include only photography.js
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
