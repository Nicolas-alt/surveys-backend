const express = require('express');
const app = express();
const User = require('../models/userModel');
const bcrypt = require('bcrypt');

app.get('/api/v1/user', (req, res) => {
  let startFrom = req.query.start || 0;
  startFrom = Number(startFrom);

  User.find({})
    .skip(startFrom)
    .limit(15)
    .exec((err, users) => {
      if (err) {
        return res.status(400).json({ msg: 'Ups', err });
      }

      User.count({}, (err, total) => {
        res.json({
          total,
          users,
        });
      });
    });
});

app.post('/api/v1/user', (req, res) => {
  let dataBody = req.body;

  let user = new User({
    userName: dataBody.userName,
    email: dataBody.email,
    password: bcrypt.hashSync(dataBody.password, 15),
    country: dataBody.country,
    age: dataBody.age,
    role: dataBody.role,
  });

  user.save((err, userFromDb) => {
    if (err) {
      return res.status(400).json({ msg: 'Ups', err });
    }

    userFromDb.password = null;

    res.json({
      userFromDb,
    });
  });
});

app.put('/api/v1/user/:id', (req, res) => {
  let id = req.params.id;
  let body = req.body;

  delete body.password;

  User.findByIdAndUpdate(
    id,
    body,
    { new: true, runValidators: true },
    (err, userDb) => {
      if (err) {
        return res.status(400).json({
          msg: 'Something is wrong',
        });
      }
      res.json({
        userDb,
      });
    }
  );
});

module.exports = app;
