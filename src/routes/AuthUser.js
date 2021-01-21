const express = require('express');
const app = express();
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

app.post('/api/v1/auth/user', (req, res) => {
  let data = req.body;

  User.findOne({ email: data.email }, (err, userDb) => {
    if (err) {
      return res.status(400).json({
        err,
      });
    }

    if (!userDb) {
      return res.status(400).json({ msg: 'User or password wrong' });
    }

    if (!data.password) {
      return res.status(400).json({ msg: 'The password is necesary' });
    }

    if (!bcrypt.compareSync(data.password, userDb.password)) {
      return res.status(400).json({ msg: 'User or password wrong' });
    }

    const { _id, role, userName, email } = userDb;

    let token = jwt.sign(
      {
        _id,
        role,
        userName,
        email,
      },
      process.env.SEED,
      { expiresIn: process.env.TOKEN }
    );

    res.json({
      msg: 'logged',
      token,
      _id,
      role,
      userName,
      email,
    });
  });
});

module.exports = app;
