const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = () => {
  return {
    entry: {
      app: path.resolve(process.cwd(), 'src/index.js'),
    },
    output: {
      filename: '[name].[hash].bundle.js',
      path: path.resolve(process.cwd(), 'build'),
      // publicPath: path.resolve(process.cwd(), 'build'),
    },
    devServer: {
      port: 8000,
      open: true,
      hot: true,
      contentBase: path.resolve(process.cwd(), 'build'),
      writeToDisk: true,
    },

    module: {
      rules: [
        {
          test: /\.jsx?$/,
          use: 'babel-loader',
        },
        {
          test: /\.(png|jpe?g|json|svg)/,
          use: 'file-loader',
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(
          process.cwd(),
          'config/webpack/templates/index.html',
        ),
      }),
      new CleanWebpackPlugin(),
    ],
  }
}
