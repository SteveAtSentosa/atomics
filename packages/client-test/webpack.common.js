const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyWebpackPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: {
    'reactive-items-demo': './src/index.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Reactive Items Demo',
      meta: { viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no' }
    }),
  ],
  optimization: {
    minimizer: [new UglifyWebpackPlugin()],
  },
}


