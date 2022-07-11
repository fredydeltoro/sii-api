const schedule = (data) => {
  const getIdRegex = /<b>(.*)<\/b>/;
  const getscheduleRegex = /(\d{2}:\d{2})-(\d{2}:\d{2})<br>(.*)<br>/;

  const scheduleData = data.rows.slice(0, -1).map((record) => {
    const newRecord = record.slice(0, -1).map((field, index) => {
      if (index === 0) {
        const splited = field.data.replaceAll('&nbsp;', '').split('<br>');

        return {
          id: splited[0].match(getIdRegex)[1],
          subject: splited[1],
          teacher: splited[2],
        };
      }

      if (index === 1) {
        return { group: field.data };
      }

      if (index === 2) {
        return { credits: field.data };
      }

      if (index >= 3) {
        const scdData = field.data.match(getscheduleRegex);
        if (scdData) {
          return {
            start: scdData[1],
            end: scdData[2],
            build: scdData[3],
          };
        }
        return scdData;
      }

      return field.data;
    });
    return {
      subjectData: {
        ...newRecord[0],
        ...newRecord[1],
        ...newRecord[2],
      },
      schedule: newRecord.slice(3),
    };
  });

  return scheduleData;
};

module.exports = schedule;
