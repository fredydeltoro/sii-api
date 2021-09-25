const cheerio = require('cheerio');
const apiClient = require('../../drivers/apiClient.js');
const mapTable = require('../../drivers/mapTable.js');
const subjectProgress = require('../../models/subjectProgress.js');

module.exports = (Router) => {
  const router = new Router();

  router.get('/', ({ response }) => {
    response.status = 200;
  });

  return router.routes();
};
