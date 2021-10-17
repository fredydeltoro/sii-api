const axios = require('axios');

const axiosInstance = () =>
  axios.create({
    baseURL: 'https://sii.itsanjuan.edu.mx/sistema',
    timeout: 1000,
    responseType: 'arraybuffer',
    transformResponse: [(data) => new TextDecoder('latin1').decode(data)],
  });

module.exports = axiosInstance();
