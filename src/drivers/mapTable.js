const mapTable = ($, table) => {
  const tbody = Array.from(table.children());
  const headers = tbody[0].children
    .filter((el) => el.type === 'tag')
    .map((el) => $(el).text().trim());
  const rows = tbody.slice(1).map((tr) =>
    tr.children
      .filter((el) => el.type === 'tag')
      .map((el) => ({
        data: $(el).text().trim(),
        attribs: { ...el.attribs },
      })),
  );
  return {
    headers,
    rows,
  };
};

module.exports = mapTable;
