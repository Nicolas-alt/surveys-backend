const express = require('express');
const app = express();

const Survey = require('../models/surveyModel');
const userTokenAuth = require('../middlewares/UserAuth');
const adminRolAuth = require('../middlewares/UserRole');

// All
app.get('/api/v1/surveys', (req, res) => {});

// One
app.get('/api/v1/surveys/:id', (req, res) => {});

app.post('/api/v1/surveys', (req, res) => {});

app.put('/api/v1/surveys/:id', (req, res) => {});

app.delete('/api/v1/surveys/:id', (req, res) => {});

module.exports = app;
