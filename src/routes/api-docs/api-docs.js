const fs = require('fs');
const path = require('path');

module.exports = (Router) => {
  const router = new Router();

  router.get('', async (ctx) => {
    ctx.type = 'html';
    ctx.body = fs.createReadStream(
      path.resolve(path.join('src', 'docs', 'index.html')),
    );
  });

  router.get('spec', async (ctx) => {
    ctx.body = fs.createReadStream(
      path.resolve(path.join('src', 'docs', 'swagger.json')),
    );
  });

  return router.routes();
};
