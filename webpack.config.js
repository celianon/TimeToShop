const path = require("path")

module.exports = {
  entry: './static/src/js/index.js',
  output: {
    path: path.join(__dirname, "/static/build/"),
    filename: "index.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
      }
    ]
  }
}