const qs = require('qs');
const apiClient = require('../../drivers/apiClient.js');

module.exports = (Router) => {
  const router = new Router();

  router.post('/', async ({ response, request }) => {
    const { body } = request;
    const login = await apiClient.post(
      '/acceso.php',
      qs.stringify({
        ...body,
        tipo: 'a',
      }),
    );

    apiClient.defaults.headers.common.Cookie = login.headers['set-cookie'][0];

    console.log('a ver veamos ====>', apiClient.defaults.headers.common);
    response.status = 200;
  });

  return router.routes();
};
