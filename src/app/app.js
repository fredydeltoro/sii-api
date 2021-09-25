const Koa = require('koa');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');

const app = new Koa();

app.use(cors());

app.use(bodyParser({
  enableTypes: ['json'],
  jsonLimit: '4mb',
  strict: true,
}));

module.exports = app;
