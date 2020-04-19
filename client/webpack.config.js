const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  entry: [
    "@babel/polyfill",
    "./src/js/searchController.js",
    "./src/js/foodController.js",
    "./src/js/dailyActivityController.js",
    "./src/js/navigationController.js"
  ],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/bundle.js"
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    host: "0.0.0.0",
    port: 8080,
    openPage: "http://localhost:8080",
    proxy: {
      "/api": "http://localhost:7777"
      /* {
        target: 'https://other-server.example.com',
        secure: false
      } */
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html"
    }),
    new webpack.ProvidePlugin({
      globals: [path.resolve(path.join(__dirname, "src/js/globals"))]
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
};