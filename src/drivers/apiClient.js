const axios = require('axios');

const message = 'ES NECESARIO AUTENTIFICARSE EN EL SISTEMA';

const axiosInstance = () => {
  const customAxios = axios.create({
    baseURL: 'https://sii.itsanjuan.edu.mx/sistema',
    timeout: 1000,
    responseType: 'arraybuffer',
    transformResponse: [(data) => new TextDecoder('latin1').decode(data)],
  });

  customAxios.interceptors.response.use((response) => {
    response.error = response.data.includes(message);
    return response;
  });

  return customAxios;
};

module.exports = axiosInstance();
