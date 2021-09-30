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

  let periods = [];

  limits.forEach((from, index) => {
    let to = limits[index + 1];

    if (!to) {
      to = { index: ratingsRows.length };
    }

    periods.push(ratingsRows.slice(from.index, to.index));
  });

  const regex = /\[--(\w{3,6}-*\w{3})\/(\d{4})\]/;
  const periodParse = (el) => {
    if (el.length === 1) {
      const match = el[0].data.match(regex);
      return {
        periodo: match[1],
        año: match[2],
      };
    }

    if (el.length === 4) {
      const records = el.filter((record, index) => (index + 1) % 2 === 0);
      return simpleParse({ prom_semestral: '', cred_aprovados: '' }, records);
    }

    if (el.length === 6 || el.length === 7) {
      return simpleParse(
        {
          id: '',
          materia: '',
          creditos: '',
          calificacion: '',
          evaluacion: '',
          observaciones: '',
        },
        el.filter((record, index) => index !== 0),
      );
    }

    return el;
  };

  periods = periods.map((period) => {
    const periodParsed = period.map(periodParse);
    const rest = periodParsed
      .filter((record) => !record.id)
      .reduce((p, c) => ({ ...p, ...c }), {});
    return {
      ...rest,
      calificaciones: periodParsed.filter((record) => record.id),
    };
  });

  return {
    periodos: periods,
    alumno: studentData,
    ...averageData,
  };
};

module.exports = kardex;
