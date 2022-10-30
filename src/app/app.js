const Koa = require('koa');
const cors = require('@koa/cors');
const bodyParser = require('koa-body');
const logger = require('../drivers/logger');
const reqmdw = require('../drivers/req-mdw');

const app = new Koa();

app.use(cors());
app.use(bodyParser({ json: true, urlencoded: false }));
app.use(async (ctx, next) => {
  if (ctx.request.url.match(/^\/api/i)) {
    const token = ctx.request.headers.authorization;
    if (token) {
      ctx.token = {
        headers: {
          common: {
            Cookie: `PHPSESSID=${token.replace('Bearer ', '')}`,
          },
        },
      };
    } else {
      ctx.token = undefined;
    }
  }
  await next();
});
logger(app);
reqmdw(app);

module.exports = app;
