const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

// global vars
require('./src/config/serverConfig');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
mongoose.connect(process.env.URLDB, (err, res) => {
  if (err) throw err;
  console.log('DB ok');
});

app.use(require('./src/routes/index'));

app.listen(process.env.PORT);
