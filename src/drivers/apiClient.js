const axios = require('axios');

const axiosInstance = () =>
  axios.create({
    baseURL: 'http://187.216.132.62:81/sistema/',
    timeout: 1000,
  });

module.exports = axiosInstance();
