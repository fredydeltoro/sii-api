const simpleParse = require('../drivers/simpleParse.js');

const subjectProgress = (data) => {
  const studentData = simpleParse(
    {
      no_control: '',
      name: '',
      semester: '',
      period: '',
      accumulated_avg: '',
    },
    data.student.rows[0],
  );

  const academic = simpleParse(
    { career: '', field: '' },
    data.academic.rows[0],
  );

  const regex = /([A-Z]{1,3}\-*\d{1,2})\s+<br>([À-ÿ\w+\s\.]+)[<br>]*(.*)*/;
  const formatSubject = (subject, index) => {
    if (subject.data === '&nbsp;') {
      return null;
    }

    const subjectModel = {
      id: '',
      subject: '',
      rating: null,
      evaluation: null,
      status: null,
      semester: null,
    };

    const match = subject.data.match(regex);

    if (match) {
      subjectModel.id = match[1];
      subjectModel.subject = match[2];
      if (match[3]) {
        const rest = match[3].split('/');
        subjectModel.rating = parseInt(rest[0]);
        subjectModel.evaluation = rest[1];
      }
      subjectModel.status = subject.attribs.id;
      subjectModel.semester = index + 1;
    }

    return subjectModel;
  };

  const progress = data.subjects.rows
    .map((row) => row.map(formatSubject).filter((subject) => subject))
    .reduce((previous, current) => previous.concat(current), []);

  return {
    student: { ...studentData, ...academic },
    progress,
  };
};

module.exports = subjectProgress;
