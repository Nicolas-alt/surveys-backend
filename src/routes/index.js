const express = require('express');
const app = express();

app.use(require('./AuthUser'));
app.use(require('./userRoutes'));

module.exports = app;
