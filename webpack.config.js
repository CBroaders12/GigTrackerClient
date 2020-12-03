// const path = require('path');

// module.exports = {
//   entry: {
//     app: path.join(__dirname, 'src', 'index.tsx')
//   },

//   output: {
//     filename: 'app.js',
//     path: path.resolve(__dirname, 'dist')
//   },

//   module: {
//     rules: [
//       {
//         test: /\.ts(x?)$/,
//         exclude: /node_modules/,
//         use: [
//           {
//             loader: "ts-loader"
//           }
//         ],
//       },
//       {
//         test: /\.css$/,
//         use: ["style-loader", "css-loader"]
//       },
      
//       {
//         enforce: "pre",
//         test: /\.js$/,
//         loader: "source-map-loader"
//       }
//     ]
//   }
// }

const path = require('path');

module.exports = {
  entry: './src/index.tsx',
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        loader: 'file-loaders'
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      }
    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};