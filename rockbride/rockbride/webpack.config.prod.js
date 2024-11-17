const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = merge(common, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.scss$/i, // Match Sass/SCSS files
        use: [
          MiniCssExtractPlugin.loader, // Extract CSS to a separate file
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,  // Match font file types
        type: 'asset/resource',  // This will move the fonts to the output directory
        generator: {
          filename: 'fonts/[name].[hash][ext][query]',  // Place fonts in the 'fonts/' folder
        },
      },
      {
        test: /\.(jpg|jpeg|png|gif|svg|webp)$/,  // Match image file types
        type: 'asset/resource',  // Moves images to the output folder
        generator: {
          filename: 'img/[name].[hash][ext][query]',  // Place images in the 'images/' folder
        },
      },
    ],
  },
  output: {
    filename: 'js/[name].[contenthash].js', // Use contenthash for cache busting
    path: path.resolve(__dirname, '../../rockbride-publish'), // Set absolute path to rockbride-publish
    clean: true,
    publicPath: '/rockbride-publish/', // Adjust this based on your deployment path
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html', // Use your root index.html
      filename: 'index.html', // Output index.html in dist
      base: '/rockbride-publish/', // Set the base URL for the generated HTML file
      chunks: ['main'], // Include only main.js
    }),
    new HtmlWebpackPlugin({
      template: './photography.html', // This is for photography.html
      filename: 'photography.html',  // Output photography.html in dist
      base: '/rockbride-publish/', // Set the base URL for the generated HTML file
      chunks: ['photography'], // Include only photography.js
    }),
    new MiniCssExtractPlugin({
      filename: 'css/style.css', // Output CSS in the `css` folder
    }),
    new CopyPlugin({
      patterns: [
        { from: 'img', to: 'img' },
        { from: 'css', to: 'css' },
        { from: 'js/vendor', to: 'js/vendor' },
        { from: 'icon.svg', to: 'icon.svg' },
        { from: 'favicon.ico', to: 'favicon.ico' },
        { from: 'robots.txt', to: 'robots.txt' },
        { from: 'icon.png', to: 'icon.png' },
        { from: '404.html', to: '404.html' },
        { from: 'site.webmanifest', to: 'site.webmanifest' },
      ],
    }),
  ],
});
