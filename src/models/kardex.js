const simpleParse = require('../drivers/simpleParse.js');

const kardex = (data) => {
  const { student, ratings } = data;

  const studentData = simpleParse(
    {
      no_control: '',
      nombre: '',
      plan: '',
      semestre: '',
      carrera: '',
      especialidad: '',
    },
    student.rows[0].concat(student.rows[2]),
  );

  const ratingsRows = ratings.rows.map((row) =>
    row.filter((record) => record.data.length),
  );

  const averages = ratingsRows.splice(-3).slice(0, 2);

  const averageData = simpleParse(
    {
      prom_aritmetico: '',
      cred_cursados: '',
      prom_certificado: '',
      cred_aprovados: '',
    },
    averages
      .reduce((previous, current) => previous.concat(current), [])
      .filter((record) => record.attribs.id),
  );

  const limits = ratingsRows
    .map((row, index) => ({
      index,
      length: row.length,
    }))
    .filter((row) => row.length === 1);

  const periods = [];

  limits.forEach((from, index) => {
    let to = { index: ratingsRows.length };

    if (limits[index + 1]) {
      to = limits[index + 1];
    }

    periods.push(ratingsRows.slice(from.index, to.index));
  });

  return {
    periods,
    alumno: studentData,
    ...averageData,
  };
};

module.exports = kardex;
