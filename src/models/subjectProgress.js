const simpleParse = require('../drivers/simpleParse.js');

const subjectProgress = (data) => {
  const studentData = simpleParse(
    {
      no_control: '',
      nombre: '',
      semestre: '',
      periodo: '',
      prom_acum: '',
    },
    data.student,
  );

  const academic = simpleParse({ carrea: '', especialidad: '' }, data.academic);
  // /([A-Z]{1,3}\-*\d{1,2})\s+\<br\>(.*)[\<br\>(.*)]*/
  // /([A-Z]{1,3}\-*\d{1,2})\s+<br>([\w+\s\.]+)[<br>(.*)]*/
  // /([A-Z]{1,3}\-*\d{1,2})\s+<br>([\w+\s\.]+)[<br>]*(.*)*/

  let progress = [];
  const regex = /([A-Z]{1,3}\-*\d{1,2})\s+<br>([\w+\s\.]+)[<br>]*(.*)*/;

  progress = data.subjects.rows.map((row) =>
    row.map((subject) => {
      const subjectModel = {
        id: '',
        materia: '',
        calificacion: null,
        evaluacion: null,
      };
      const match = subject.data.match(regex);
      if (match) {
        subjectModel.id = match[1];
        subjectModel.materia = match[2];
        if (match[3]) {
          const rest = match[3].split('/');
          subjectModel.calificacion = rest[0];
          subjectModel.evaluacion = rest[1];
        }
      }
      return subjectModel;
    }),
  );

  return {
    alumno: { ...studentData, ...academic },
    progreso: progress,
  };
};

module.exports = subjectProgress;
