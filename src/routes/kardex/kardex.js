const cheerio = require('cheerio');
const apiClient = require('../../drivers/apiClient.js');
const mapTable = require('../../drivers/mapTable.js');
const subjectProgress = require('../../models/subjectProgress.js');

module.exports = (Router) => {
  const router = new Router();

  router.get('/', async ({ response }) => {
    const url = '/modulos/cons/alumnos/kardex.php';
    const res = await apiClient.get(url);
    const $ = cheerio.load(res.data);
    const student = mapTable($, $('body > table:nth-child(2) > tbody'));

    response.status = 200;
    response.body = {
      student,
    };
  });

  return router.routes();
};
