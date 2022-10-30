const cheerio = require('cheerio');
const apiClient = require('../../drivers/apiClient.js');
const mapTable = require('../../drivers/mapTable.js');
const currentNotes = require('../../models/currentNotes.js');

module.exports = (Router) => {
  const router = new Router();

  router.get('/', async ({ response, token }) => {
    const url = '/modulos/alu/cons/calif_parciales.php';
    const res = await apiClient.get(url, token);

    if (res.error) {
      response.status = 401;
    } else {
      const $ = cheerio.load(res.data);
      const data = currentNotes(mapTable($, $('body > table > tbody'), 'html'));

      response.status = 200;
      response.body = data;
    }
  });

  return router.routes();
};
