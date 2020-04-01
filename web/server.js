require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const port = process.env.PORT || 3456;
const villainRouter = require('./routes/villains.js');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'))

app.set('view engine', 'ejs');

app.use('/villains', villainRouter);

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
