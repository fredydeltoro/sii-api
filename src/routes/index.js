const Router = require('koa-router');
const health = require('./health');
const login = require('./login');

module.exports = (app) => {
  const router = new Router();

  router.use('/health', health(Router));
  router.use('/api/v1/login', login(Router));

  app.use(router.routes());
}
