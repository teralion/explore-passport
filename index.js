const app = require('./app');
const config = require('config');

app.listen(config.get('port'), () => {
  console.log('App is running at', config.get('port'), 'port');
});
