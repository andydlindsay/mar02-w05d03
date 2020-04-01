const { Client } = require('pg');

const config = {
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  host: process.env.DATABASE_HOST
};

const client = new Client(config);

client.connect();

module.exports = client;
