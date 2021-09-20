const cheerio = require('cheerio');
const apiClient = require('../../drivers/apiClient.js');
const mapTable = require('../../drivers/mapTable.js');

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
    );

    // ([A-Z]{2}\d{1,2})\s+\<br\>(.*)\<br\>(.*)/

    response.status = 200;
    response.body = { student, academic, subjects };
  });

  return router.routes();
};
