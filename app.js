const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

require('./handlers/errors').init(app);
require('./handlers/logger').init(app);
require('./handlers/templates').init(app);
require('./handlers/bodyParser').init(app);
require('./handlers/favicon').init(app);
require('./handlers/session').init(app);
require('./handlers/passport').init(app);
require('./handlers/flash').init(app);
require('./handlers/static').init(app);

router.get('/', require('./routes/frontpage').get);
router.post('/login', require('./routes/login').post);
router.post('/logout', require('./routes/logout').post);

app.use(router.routes());

module.exports = app;
