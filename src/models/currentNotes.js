const currentNotes = (data) => {
  const regexId = /^(\w+) /;
  const notesData = data.rows.slice(1).map((record) => {
    const subjectData = record[0].data;
    let id = subjectData.match(regexId);
    let name = subjectData.replace(regexId, '').trim().split('<br>');
    const group = record[1].data;
    const notes = record
      .slice(2)
      .map((note) => (note?.data?.length ? note?.data : null));

    if (name.length === 2) {
      name = name[0];
    }

    if (id) {
      id = id[1];
    }

    return {
      id: id || '',
      name: name || '',
      group,
      notes,
    };
  });
  return notesData;
};

module.exports = currentNotes;
