const path = require('path');

module.exports = {
  port: 3000,
  root: process.cwd(),
  secret: 'my_secret',
  publicRoot: path.join(process.cwd(), 'public'),
  templatesRoot: path.join(process.cwd(), 'templates'),
  crypto: {
    hash: {
      length: 128,
      iterations: 10
    }
  },
  mongodb: {
    debug: true,
    uri: 'mongodb://localhost/passport_app'
  }
}
