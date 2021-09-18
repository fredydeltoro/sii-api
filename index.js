const axios = require('axios');
const cheerio = require('cheerio');

const init = async () => {
  axios.get('http://187.216.132.62:81/sistema//index.php', {
    withCredentials: true
  }).then((res) => {
    console.log('mmmm que pasara? ===>', res.headers['set-cookie']);
  })

  const login = await axios.post('http://187.216.132.62:81/sistema//acceso.php', 'tipo=a&usuario=12590161&contrasena=8623', {
    withCredentials: true
  })

  console.log('mmmm a ver ???? ====>', login.headers['set-cookie'][0]);

  axios.get('http://187.216.132.62:81/sistema//modulos/cons/alumnos/avance_reticular.php', {
    headers: {
      Cookie: `${login.headers['set-cookie'][0]}`
    },
    withCredentials: true
  }).then((res) => {
    const $ = cheerio.load(res.data)
    console.log('===================================');
    $('body > table:nth-child(1) > tbody').children().each((i, el) => {
      console.log($(el).text());
    })
    console.log('===================================');
  })
}

init()
