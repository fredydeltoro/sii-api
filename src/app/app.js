const Koa = require('koa');
const cors = require('@koa/cors');
const bodyParser = require('koa-body');
const logger = require('../drivers/logger');
const reqmdw = require('../drivers/req-mdw');

const app = new Koa();

app.use(cors());
app.use(bodyParser({ json: true, urlencoded: false }));
logger(app);
reqmdw(app);

module.exports = app;
