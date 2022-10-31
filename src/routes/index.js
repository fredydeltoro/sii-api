const Router = require('koa-router');
const health = require('./health');
const apiDocs = require('./api-docs');
const login = require('./login');
const logout = require('./logout');
const subjectProgress = require('./subject-progress');
const kardex = require('./kardex');
const schedule = require('./schedule');
const currentNotes = require('./current-notes');

module.exports = (app) => {
  const router = new Router();

  router.use('/', apiDocs(Router));
  router.use('/health', health(Router));
  router.use('/api/v1/login', login(Router));
  router.use('/api/v1/logout', logout(Router));
  router.use('/api/v1/subject-progress', subjectProgress(Router));
  router.use('/api/v1/kardex', kardex(Router));
  router.use('/api/v1/schedule', schedule(Router));
  router.use('/api/v1/current-notes', currentNotes(Router));

  app.use(router.routes());
};
