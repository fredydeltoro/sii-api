const axios = require('axios');

const axiosInstance = () => {
  const instance = axios.create({
    baseURL: 'http://187.216.132.62:81/sistema/',
    timeout: 1000,
    responseType: 'arraybuffer',
    transformResponse: [(data) => new TextDecoder('latin1').decode(data)],
  });

  // instance.interceptors.request.use((config) => {
  //   config.headers.responseType = 'arraybuffer';
  //   return config;
  // });

  // instance.interceptors.response.use(
  //   (response) => {
  //     // Do something with response data
  //     // console.log('=====>', response);
  //     // return response;
  //   },
  //   (error) =>
  //     // Do something with response error
  //     Promise.reject(error),
  // );

  return instance;
};

module.exports = axiosInstance();
