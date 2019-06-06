const merge = require('webpack-merge');

const common = require('./config.common');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  watch: true,
  devServer: {
    historyApiFallback: true,
    port: 8080,
    hot: true,
  },
});
