const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    //
    // - Write all logs with level `error` and below to `error.log`
    // - Write all logs with level `info` and below to `combined.log`
    //
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  );
}

module.exports = (app) => {
  const info = async (msg, extra = {}) => logger.info(msg, extra);
  const error = async (msg, extra = {}) => logger.error(msg, extra);
  const debug = async (msg, extra = {}) => logger.debug(msg, extra);
  const warn = async (msg, extra = {}) => logger.warn(msg, extra);
  const log = async (msg, extra = {}) => logger.log(msg, extra);

  app.context.logger = {
    info,
    error,
    debug,
    warn,
    log,
  };
};
