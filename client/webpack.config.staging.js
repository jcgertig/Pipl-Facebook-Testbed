var webpack = require('webpack');
var config = require('./webpack.config.base');

const API_BASE = 'http://www.staging.com/api';
const NODE_ENV = 'staging';

module.exports = Object.assign({}, config({ env: NODE_ENV, apiBase: API_BASE }), {
  // or devtool: 'eval' to debug issues with compiled output:
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'babel-polyfill',
    // necessary for hot reloading with IE:
    'eventsource-polyfill',
    // listen to code updates emitted by hot middleware:
    'webpack-hot-middleware/client',
    // your code:
    './index.js',
  ],
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(NODE_ENV),
        API_BASE: JSON.stringify(API_BASE),
      },
    }),
  ],
});
