const apiClient = require('../../drivers/apiClient.js');

module.exports = (Router) => {
  const router = new Router();

  router.get('/', async ({ response, token }) => {
    await apiClient.get('/cerrar_sesion.php', token);

    response.status = 200;
  });

  return router.routes();
};
