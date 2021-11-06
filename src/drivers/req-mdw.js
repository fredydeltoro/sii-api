module.exports = (app) => {
  app.use(async ({ logger, request, response }, next) => {
    const start = Date.now();
    logger.info(`<-- ${request.method} ${request.url}`, {
      method: request.method,
      url: request.url,
      start,
    });
    await next();
    const end = Date.now();
    const ms = Date.now() - start;
    const length = Buffer.byteLength(JSON.stringify(response.body || ''));

    logger.info(
      `--> ${request.method} ${request.url} ${response.status} ${ms}ms ${length}b`,
      {
        method: request.method,
        url: request.url,
        status: response.status,
        end,
        ms,
        length,
      },
    );
  });
};
