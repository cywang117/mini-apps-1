const path = require('path');

module.exports = {
  entry: path.join(__dirname, "client"),
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "app.js",
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, "client")
        ],
        loader: "babel-loader"
      }
    ]
  },
  devtool: "source-map"
}