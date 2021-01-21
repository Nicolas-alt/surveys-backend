const express = require('express');
const app = express();

app.use(require('./AuthUser'));
app.use(require('./userRoutes'));
app.use(require('./surveyRoutes'));

module.exports = app;
