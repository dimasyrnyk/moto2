const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin")
const {CleanWebpackPlugin} = require("clean-webpack-plugin")
const { SourceMapDevToolPlugin } = require("webpack")


module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js'
  },
  devtool: "source-map",
  output: {
      filename: '[name].bundle.js',
      path: path.join(__dirname, '/dist'),
      sourceMapFilename: "[name]/bundle.js.map",
  },
  // optimization: {
  //   splitChunks: {
  //     chunks: 'all',
  //   },
  // },
  module: {
    rules: [
      {
        test: /\.(jsx|js)?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [ "style-loader", "css-loader", "sass-loader" ]
      },
      {
        test: /\.css$/i,
        use: [ "style-loader", "css-loader" ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    }),
    new CleanWebpackPlugin(),
    new SourceMapDevToolPlugin({
      filename: "[file].map"
    })
  ],
  stats: {
    children: true,
  },
  devServer: {
    proxy: [{
      path: '/api/',
      target: 'http://localhost:5000'
    }],
    historyApiFallback: true
  },
}