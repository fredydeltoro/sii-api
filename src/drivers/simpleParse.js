const simpleParse = (model, data) => {
  keys = Object.keys(model);

  data.rows[0].forEach((record, i) => {
    model[keys[i]] = record.data;
  });
  return model;
};

module.exports = simpleParse;
