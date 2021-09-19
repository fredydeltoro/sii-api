const Router = require('koa-router');
const health = require('./health');

module.exports = (app) => {
  const router = new Router();

  console.log('algo');

  router.use('/health', health(Router));

  app.use(router.routes());
}
