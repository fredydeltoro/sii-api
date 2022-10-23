const cheerio = require('cheerio');
const apiClient = require('../../drivers/apiClient.js');
const mapTable = require('../../drivers/mapTable.js');
const schedule = require('../../models/schedule.js');

module.exports = (Router) => {
  const router = new Router();

  router.get('/', async ({ response, token }) => {
    const url = '/modulos/cons/alumnos/horario_alumno.php';
    const res = await apiClient.get(url, {
      headers: {
        common: {
          Cookie: `PHPSESSID=${token}`,
        },
      },
    });

    if (res.error) {
      response.status = 401;
    } else {
      const $ = cheerio.load(res.data);
      const data = schedule(
        mapTable($, $('body > table:nth-child(7) > tbody'), 'html'),
      );

      response.status = 200;
      response.body = data;
    }
  });

  return router.routes();
};
