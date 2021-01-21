const express = require('express');
const app = express();

app.use(require('./AuthUser'));
app.use(require('./userRoutes'));
app.use(require('./surveyRoutes'));
app.use(require('./surveyQuestion'));
app.use(require('./surveyAnswer'));
app.use(require('./userResponse'));

module.exports = app;
