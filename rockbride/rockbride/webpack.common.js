const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './js/app.js', // JavaScript entry point
  output: {
    filename: 'js/bundle.js', // Output JavaScript to the `js` folder
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.scss$/i, // Process Sass files
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.html$/i, // Process HTML files
        loader: 'html-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html', // Use your root index.html
      filename: 'index.html', // Output index.html in `dist`
    }),
  ],
};
