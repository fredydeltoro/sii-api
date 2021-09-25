const Koa = require('koa');
const cors = require('@koa/cors');
const bodyParser = require('koa-body');

const app = new Koa();

app.use(cors());

app.use(bodyParser({ json: true, urlencoded: false }));

module.exports = app;
