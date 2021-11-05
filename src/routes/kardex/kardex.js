const cheerio = require('cheerio');
const apiClient = require('../../drivers/apiClient.js');
const mapTable = require('../../drivers/mapTable.js');
const kardex = require('../../models/kardex.js');

module.exports = (Router) => {
  const router = new Router();

  router.get('/', async ({ response }) => {
    const url = '/modulos/cons/alumnos/kardex.php';
    const res = await apiClient.get(url);

    if (res.error) {
      response.status = 401;
    } else {
      const $ = cheerio.load(res.data);
      const student = mapTable($, $('body > table:nth-child(2) > tbody'));
      const ratings = mapTable($, $('body > table:nth-child(3) > tbody'));
      const data = kardex({
        student,
        ratings,
      });

      response.status = 200;
      response.body = data;
    }
  });

  return router.routes();
};
