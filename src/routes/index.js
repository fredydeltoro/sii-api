const Router = require('koa-router');
const health = require('./health');
const apiDocs = require('./api-docs');
const login = require('./login');
const subjectProgress = require('./subject-progress');
const kardex = require('./kardex');
const schedule = require('./schedule');

module.exports = (app) => {
  const router = new Router();

  router.use('/', apiDocs(Router));
  router.use('/health', health(Router));
  router.use('/api/v1/login', login(Router));
  router.use('/api/v1/subject-progress', subjectProgress(Router));
  router.use('/api/v1/kardex', kardex(Router));
  router.use('/api/v1/schedule', schedule(Router));

  app.use(router.routes());
};
