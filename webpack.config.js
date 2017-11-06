var config;

const env = process.env.NODE_ENV || '';

switch (env) {

  case '':
  case 'dev':
    config = require('./config/dev');
    break;

  default:
    throw new Error(`Unknown NODE_ENV: ${env}`);
}

module.exports = config;
