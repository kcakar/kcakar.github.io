const path = require("path");

module.exports = {
  entry: {
    main: "./js/app.js",
    photography: "./js/photography.js",
    contact: "./js/contact.js",
  },
  output: {
    filename: "[name].js", // Create separate JS files for each entry
    publicPath: "/", // Serve assets from the root (important for dev server)
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Transpile JavaScript
        use: {
          loader: "babel-loader", // Optional: For transpiling modern JS
        },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/, // Matches plain CSS files (like FontAwesome's)
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.scss$/i, // Process Sass files
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.html$/i, // Process HTML files
        loader: "html-loader",
      },
    ],
  },
};
