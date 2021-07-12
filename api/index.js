//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const axios = require('axios')
const {Genre, Platform} = require('./src/db')
const { v4: uuidv4 } = require('uuid');
const {URL_GENRES} = require('./src/utils/constants')
const {PLATFORMS} = require('./src/utils/constants')

const getAllGenres = async () => {
  try {
    const results = await axios.get(URL_GENRES)
    const resultsOrder=results.data.results.map(genre => genre.name).sort()
    resultsOrder.map( genre => {
      const obj=results.data.results.find( e=> e.name===genre)
      Genre.findOrCreate({
        where: {
          id: obj.id,
          name: genre
        }
      })
    })
  } catch (error) {
    console.error(error)
  }
}

const platformToDb = () =>{
  try {
    PLATFORMS.map( platform => {
      Platform.findOrCreate({
        where: {
          id: uuidv4(),
          name: platform
        }
      })
    })
  } catch (error) {
    console.error(error)
  }
}

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(process.env.PORT || 3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
  getAllGenres()
  platformToDb()
});
