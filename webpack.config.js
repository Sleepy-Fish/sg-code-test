const path = require('path');

module.exports = {
  mode: 'development',
  entry: "./src/js/index.js",
  output: {
    path: path.resolve(__dirname, "public/js"),
    filename: "bundle.js"
  },
  plugins: [
    
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["babel-preset-env"]
          }
        }
      }
    ]
  },
  devServer: {
    contentBase: "./",
    hot: true
  }
};