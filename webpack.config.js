const path = require('path');
const { NODE_ENV = 'development' } = process.env;
const isDev = NODE_ENV === 'development';
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: NODE_ENV,
  entry: path.join(__dirname, 'src', 'client', 'index.ts'),
  devtool: 'inline-source-map',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: isDev ? 'bundle.js' : '[name].[contenthash].js'
  },
  resolve: {
    extensions: ['.ts', '.js', '.scss']
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.jpg$/,
        use: ['file-loader']
      },
      {
        test: /\.png$/,
        use: ['url-loader?mimetype=image/png']
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'client', 'index.html'),
      minify: isDev ? false : true,
      favicon: null
    }),
    new MiniCssExtractPlugin({
      filename: isDev ? '[name].css' : '[name].[contenthash].css',
      chunkFilename: isDev ? '[id].css' : '[id].[contenthash].css'
    })
  ]
};