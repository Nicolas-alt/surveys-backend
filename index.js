const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// global vars
require('./src/config/serverConfig');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect(process.env.URLDB, (err, res) => {
  if (err) throw err;
  console.log('DB ok');
});

app.use(require('./src/routes/index'));

app.listen(process.env.PORT);
