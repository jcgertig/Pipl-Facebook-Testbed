var config = require('./webpack.config.base');

const API_BASE = 'http://localhost:3333/api';
const NODE_ENV = 'production';

module.exports = config({ env: NODE_ENV, apiBase: API_BASE });
