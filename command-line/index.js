const { Client } = require('pg');

const config = {
  user: 'qmtlqdkg',
  password: 'XzymEPwluRNBt7zYEarb3yLdIq1G_gYC',
  database: 'qmtlqdkg',
  host: 'drona.db.elephantsql.com'
};

const client = new Client(config);

client.connect((err) => {
  if (err) throw err;
  console.log('connected to pg server');
});

const verb = process.argv[2];
let id;

switch (verb) {
  case 'browse':
    client.query('SELECT * FROM movie_villains ORDER BY id;')
      .then((result) => {
        console.log(result.rows);
        client.end();
      })
      .catch((err) => {
        // throw err;
        console.log(err);
      });
    break;

  case 'read':
    id = process.argv[3];
    client.query('SELECT * FROM movie_villains WHERE id = $1;', [id])
      .then((result) => {
        console.log(result.rows);
        client.end();
      });
    break;

  case 'edit':
    id = process.argv[3];
    const newName = process.argv[4];
    client.query('UPDATE movie_villains SET villain = $2 WHERE id = $1;', [id, newName])
      .then(() => {
        console.log('villain successfully updated');
        client.end();
      });
    break;

  case 'add':
    const villain = process.argv[3];
    const movie = process.argv[4];
    client.query('INSERT INTO movie_villains(villain, movie) VALUES($1, $2);', [villain, movie])
      .then(() => {
        console.log('villain created!');
        client.end();
      });
    break;

  case 'delete':
    id = process.argv[3];
    client.query('DELETE FROM movie_villains WHERE id = $1;', [id])
      .then(() => {
        console.log('villain has been snapped');
        client.end();
      });
    break;

  
  default:
    client.end();
    break;
}

// client.query('SELECT * FROM movie_villains;', (err, result) => {
//   if (err) throw err;
//   console.log(result.rows);
//   client.end();
// });
