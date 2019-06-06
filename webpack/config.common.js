const path = require('path');
const webpack = require('webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const getEnv = require('./getEnv');

module.exports = {
  entry: {
    main: ['core-js/stable', 'regenerator-runtime/runtime', './src/main.js'],
  },

  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
  },

  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
      },
    }],
  },

  resolve: {
    modules: [
      path.resolve(__dirname, '../node_modules'),
      path.resolve(__dirname, '../src'),
    ],
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      template: './src/index.html',
      favicon: 'src/images/favicon.ico',
    }),
    new webpack.DefinePlugin({
      'process.env': getEnv(),
    }),
  ],

  devtool: 'source-map',

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
        common: {
          name: 'common',
          chunks: 'all',
          minChunks: 2,
          enforce: true,
        },
      },
    },
    runtimeChunk: {
      name: 'manifest',
    },
  },
};
