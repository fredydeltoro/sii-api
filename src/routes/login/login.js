module.exports = (Router) => {
  const router = new Router();

  router.post('/', ({ response, request }) => {
    const { body } = request
    console.log('a ver veamos ====>', body);
    response.status = 200;
  })

  return router.routes();
};
