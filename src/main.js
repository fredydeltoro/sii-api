const app = require('./app');

require('./routes')(app);

module.exports = app.listen(process.env.PORT || 3000);
