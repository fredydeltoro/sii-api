const cheerio = require('cheerio');
const apiClient = require('../../drivers/apiClient.js');

module.exports = (Router) => {
  const router = new Router();

  router.get('/', async ({ response }) => {
    const url = '/modulos/cons/alumnos/avance_reticular.php';
    const res = await apiClient.get(url);
    const $ = cheerio.load(res.data);
    const data = [];

    $('body > table:nth-child(1) > tbody')
      .children()
      .each((i, el) => {
        data.push($(el).text());
      });

    response.status = 200;
    response.body = { data };
  });

  return router.routes();
};
