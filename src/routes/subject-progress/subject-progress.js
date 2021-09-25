const cheerio = require('cheerio');
const qs = require('qs');
const apiClient = require('../../drivers/apiClient.js');
const mapTable = require('../../drivers/mapTable.js');
const subjectProgress = require('../../models/subjectProgress.js');
// const data = require('./progress.json');

module.exports = (Router) => {
  const router = new Router();

  router.get('/', async ({ response }) => {
    const url = '/modulos/cons/alumnos/avance_reticular.php';
    const res = await apiClient.get(url);
    const $ = cheerio.load(res.data);
    const student = mapTable($, $('body > table:nth-child(1) > tbody'));
    const academic = mapTable($, $('body > table:nth-child(2) > tbody'));
    const subjects = mapTable(
      $,
      $('body > table:nth-child(4) > tbody'),
      'html',
      true,
    );

    const data = subjectProgress({
      student,
      academic,
      subjects,
    });

    response.status = 200;
    response.body = data;
  });

  return router.routes();
};
