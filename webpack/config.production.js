const merge = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');

const common = require('./config.common');

module.exports = merge(common, {
  mode: 'production',
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
        sourceMap: true,
        terserOptions: {
          output: {
            comments: false,
          },
        },
      }),
    ],
  },
});
