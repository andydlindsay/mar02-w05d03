const client = require('./db');

const getVillains = (callback) => {
  client.query('SELECT * FROM movie_villains ORDER BY id;')
    .then((result) => {
      // console.log(result.rows);
      callback(null, result.rows);
    })
    .catch((err) => {
      // throw err;
      console.log(err);
      callback(err);
    });
};

const getVillainById = (id) => {
  return client.query('SELECT * FROM movie_villains WHERE id = $1;', [id])
    .then((result) => {
      console.log(result.rows);
      return result.rows[0];
    });
};

module.exports = {
  getVillains,
  getVillainById
};
