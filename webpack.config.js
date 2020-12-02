const path = require('path');

module.exports = {
  entry: {
    app: path.join(__dirname, 'dist', 'app.js')
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },

  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader"
          }
        ],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        enforce: "pre",
        rest: /\.js$/,
        loader: "source-map-loader"
      }
    ]
  }
}