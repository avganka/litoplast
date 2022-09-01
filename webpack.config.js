const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/js/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/bundle-[hash].js',
    publicPath: '',
  },
  module: {
    rules: [
      {
        test: /\.(html)$/i,
        use: {
          loader: 'html-loader-srcset',
          options: {
            attrs: [':src', ':srcset'],
          },
        },
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/i,
        type: 'asset/resource',
        generator: {
          filename: './fonts/[name]-[hash][ext]',
        },
      },
      {
        test: /\.(gif|png|webp|jpe?g)$/i,
        type: 'asset/resource',
        generator: {
          filename: './img/[name]-[hash][ext]',
        },
      },
      {
        test: /\.svg$/i,
        type: 'asset/resource',
        generator: {
          filename: './img/icons/[name]-[hash][ext]',
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: './style/[name]-[hash].css',
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      filename: 'index.html',
    }),
    new CleanWebpackPlugin(),
  ],
};
