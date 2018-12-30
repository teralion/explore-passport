const serve = require('koa-favicon');
const config = require('config');
const path = require('path');

exports.init = app => app.use(serve(
  path.join(config.get('publicRoot'), 'favicon.ico')
));
