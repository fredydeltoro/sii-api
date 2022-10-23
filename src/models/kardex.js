const simpleParse = require('../drivers/simpleParse.js');

/*

Student example
|  No. de control:  |  Nombre:                     |  Plan de Estudios               |
|-------------------|------------------------------|---------------------------------|
|  19590349         |  JORGE YASAR UGALDE VAZQUEZ  |  ITIC-2010-225                  |
|  Semestre:        |  Carrera:                    |  Especialidad:                  |
|  7                |  ING. TICS                   |  Sin Especialidad Seleccionada  |

Ratings example:
|  No.               |  Materia  |  Créditos                      |  Calificación           |  Evaluación  |  Observaciones           |
|--------------------|-----------|--------------------------------|-------------------------|--------------|--------------------------|
|  [--AGO-DIC/2019]  |   Each of this kind of row it is a limit  limits = [{index: 0, length: 1}]
| 1                  | AP1       |  CÁLCULO DIFERENCIAL           |  5                      |  81          |  Ev.Ord.1ra              |  &nbsp;   | rating record
| 2                  | BP1       |  FUNDAMENTOS DE PROGRAMACIÓN   |  5                      |  83          |  Ev.Ord.1ra              |  &nbsp;   | *
| 3                  | CP1       |  MATEMÁTICAS DISCRETAS I       |  5                      |  83          |  Ev.Ord.1ra              |  &nbsp;   | *
| 4                  | DP1       |  INTRODUCCIÓN A LAS TIC´S      |  3                      |  85          |  Ev.Ord.1ra              |  &nbsp;   | *
| 5                  | EP1       |  TALLER DE ÉTICA               |  4                      |  76          |  Ev.Ord.1ra              |  &nbsp;   | *
| 6                  | FP1       |  FUNDAMENTOS DE INVESTIGACIÓN  |  4                      |  85          |  Ev.Ord.1ra              |  &nbsp;   | *
| &nbsp;             | &nbsp;    |  &nbsp;                        |  Promedio Semestral:    |  82.17       |  Créditos Cur./Aprob.    |  26 / 26  | data of semester
| &nbsp;             | &nbsp;    |  &nbsp;                        |  Promedio Aritmético:   |  82.17       |  Créditos Cursados:      |  26       | averages => averageData
| &nbsp;             | &nbsp;    |  &nbsp;                        |  Promedio Certificado:  |  82.17       |  Créditos Aprobados:     |  26       | averages => averageData
| ESTE DOCUMENTO NO ES OFICIAL Y NO ES VALIDO, NO CONTIENE SELLOS NI FIRMAS OFICIALES DE LA INSTITUCION    |                                      | excluded

 */

const kardex = (data) => {
  const { student, ratings } = data;

  const studentData = simpleParse(
    {
      no_control: '',
      name: '',
      plan: '',
      semester: '',
      career: '',
      field: '',
    },
    student.rows[0].concat(student.rows[2]),
  );

  const ratingsRows = ratings.rows.map((row) =>
    row.filter((record) => record.data.length),
  );

  const averages = ratingsRows.splice(-3).slice(0, 2);

  const averageData = simpleParse(
    {
      arimetic_avg: '',
      taked_credits: '',
      certificated_avg: '',
      approved_credits: '',
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
    .filter((row) => row.length === 1); // Get only rows with one cell, they meaning a limit

  let periods = [];

  // convert data in chunks from the rows wiith one cell(period) to next row with one cell(next period)
  limits.forEach((from, index) => {
    let to = limits[index + 1];

    if (!to) {
      // if there is no next limit the limit is the end of rows
      to = { index: ratingsRows.length };
    }

    periods.push(ratingsRows.slice(from.index, to.index));
  });

  periods = periods.map((period) => {
    const periodParsed = period.map(periodParse);
    const rest = periodParsed // only the semester data
      .filter((record) => !record.id)
      .reduce((previous, current) => ({ ...previous, ...current }), {});
    return {
      ...rest,
      ratings: periodParsed.filter((record) => record.id), // only the  rating records
    };
  });

  return {
    periods: periods,
    student: studentData,
    ...averageData,
  };
};

const regex = /\[--(\w{3,6}-*\w{3})\/(\d{4})\]/; // [--AGO-DIC/2019] => { period: AGO-DIC, year: 2019 }

const periodParse = (el) => {
  if (el.length === 1) {
    const match = el[0].data.match(regex);
    return {
      period: match[1],
      year: match[2],
    };
  }

  if (el.length === 4) {
    const records = el.filter((record, index) => (index + 1) % 2 === 0);
    return simpleParse({ semester_avg: '', approved_credits: '' }, records);
  }

  if (el.length === 6 || el.length === 7) {
    return simpleParse(
      {
        id: '',
        subject: '',
        credits: '',
        rating: '',
        evaluation: '',
        notes: '',
      },
      el.filter((record, index) => index !== 0),
    );
  }

  return el;
};

module.exports = kardex;
