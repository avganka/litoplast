const {merge} = require('webpack-merge');
const config = require('./webpack.config.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(config, {
  devtool: 'source-map',
  mode: 'development',
  devServer: {
    open: true,
    hot: false,
    port: 8000,
  },
  target: 'web',
  module: {
    rules: [
      {
        test: /\.(s*)css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
});
