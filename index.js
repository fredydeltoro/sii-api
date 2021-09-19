const axios = require('axios');
const cheerio = require('cheerio');

const init = async () => {
  const user = process.env.USER_ID
  const password = process.env.USER_KEY
  const host = process.env.HOST
  const qs = `tipo=a&usuario=${user}&contrasena=${password}`

  // axios.get(`${host}/sistema//index.php`, {
  //   withCredentials: true
  // }).then((res) => {
  //   console.log('mmmm que pasara? ===>', res.headers['set-cookie']);
  // })
  //
  // const login = await axios.post(`${host}/sistema//acceso.php`, qs, {
  //   withCredentials: true
  // })
  //
  // console.log('mmmm a ver ???? ====>', login.headers['set-cookie'][0]);
  //
  // axios.get(`${host}/sistema//modulos/cons/alumnos/avance_reticular.php`, {
  //   headers: {
  //     Cookie: `${login.headers['set-cookie'][0]}`
  //   },
  //   withCredentials: true
  // }).then((res) => {
  //   const $ = cheerio.load(res.data)
  //   console.log('===================================');
  //   $('body > table:nth-child(1) > tbody').children().each((i, el) => {
  //     console.log($(el).text());
  //   })
  //   console.log('===================================');
  // })
}

init()
