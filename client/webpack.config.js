const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  entry: ["@babel/polyfill", "./src/index.js"],
  output: {
    path: path.resolve(__dirname, "docs"),
    filename: "js/app.js"
  },
  devServer: {
    contentBase: path.join(__dirname, "docs"),
    historyApiFallback: true,
    host: "0.0.0.0",
    port: 8080,
    // openPage: "http://localhost:8080",
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
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(js|jsx)$/i,
        exclude: /node_modules/,
        use: ["babel-loader"]
      }
    ]
  }
};
