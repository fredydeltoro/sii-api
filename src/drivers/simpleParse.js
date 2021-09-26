const simpleParse = (model, records) => {
  keys = Object.keys(model);

  records.forEach((record, i) => {
    model[keys[i]] = record.data;
  });
  return model;
};

module.exports = simpleParse;
