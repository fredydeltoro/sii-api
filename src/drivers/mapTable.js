const mapTable = ($, table, type = 'text', withHeaders = false) => {
  const tbody = Array.from(table.children());
  let headers = [];

  if (withHeaders) {
    headers = tbody[0].children
      .filter((el) => el.type === 'tag')
      .map((el) => $(el).text().trim());
  }

  const rows = tbody.slice(1).map((tr) =>
    tr.children
      .filter((el) => el.type === 'tag')
      .map((el) => ({
        data: $(el)[type]().trim(),
        attribs: { ...el.attribs },
      })),
  );

  return {
    headers,
    rows,
  };
};

module.exports = mapTable;
