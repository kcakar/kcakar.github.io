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
        test: /\.scss$/i, 
        use: [
          MiniCssExtractPlugin.loader, 
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,  
        type: 'asset/resource',  
        generator: {
          filename: 'fonts/[name].[hash][ext][query]',  
        },
      },
      {
        test: /\.(jpg|jpeg|png|gif|svg|webp)$/,  
        type: 'asset/resource',  
        generator: {
          filename: 'img/[name].[hash][ext][query]',  
        },
      },
    ],
  },
  output: {
    filename: 'js/[name].[contenthash].js', 
    path: path.resolve(__dirname, './public'), 
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html', 
      filename: 'index.html', 
      chunks: ['main'], 
    }),
    new HtmlWebpackPlugin({
      template: './photography.html', 
      filename: 'photography.html',  
      base: '', 
      chunks: ['photography'], 
    }),
    new HtmlWebpackPlugin({
      template: './contact.html', 
      filename: 'contact.html',  
      chunks: ['contact'], 
    }),
    new HtmlWebpackPlugin({
      template: './404.html', 
      filename: '404.html',  
      chunks: ['contact'], 
    }),
    new MiniCssExtractPlugin({
      filename: 'css/style.css', 
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
        { from: 'site.webmanifest', to: 'site.webmanifest' },
      ],
    }),
  ],
});
