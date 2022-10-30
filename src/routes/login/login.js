const qs = require('qs');
const apiClient = require('../../drivers/apiClient.js');

module.exports = (Router) => {
  const router = new Router();

  // PHPSESSID=alnol9939nqpkni92rpjd9a0m6;

  router.post('/', async ({ response, request, token }) => {
    if (!token || token.length === 0) {
      const { body } = request;
      const login = await apiClient.post(
        '/acceso.php',
        qs.stringify({
          ...body,
          tipo: 'a',
        }),
      );

      let token = '';

      if (login.headers['set-cookie']) {
        const match = login.headers['set-cookie'][0].match(/PHPSESSID=(.*);/);
        if (match) {
          token = match[1];
        }
      }

      response.status = 200;
      response.body = {
        token,
      };
    }
    response.status = 400;
  });

  return router.routes();
};
