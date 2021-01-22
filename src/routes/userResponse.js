const express = require('express');
const app = express();

const UserResponse = require('../models/responseModel');
const userTokenAuth = require('../middlewares/UserAuth');
const adminRolAuth = require('../middlewares/UserRole');

// All
app.get('/api/v1/user-response-question', [userTokenAuth], (req, res) => {
  UserResponse.find({})
    .populate('id_response')
    .populate('id_question')
    .populate('id_survey')
    .exec((err, userResponseFromDb) => {
      if (err) return res.status(400).json({ msg: 'Ups', err });

      UserResponse.count({}, (err, responseCount) => {
        if (err) return res.status(400).json({ msg: 'Ups', err });

        res.json({
          responseCount,
          userResponseFromDb,
        });
      });
    });
});

app.post(
  '/api/v1/user-response-question',
  [userTokenAuth, adminRolAuth],
  (req, res) => {
    let dataBody = req.body;

    let userResponse = new UserResponse({
      response: dataBody.response,
      id_response: dataBody.id_response,
      id_question: dataBody.id_question,
      id_survey: dataBody.id_survey,
    });

    userResponse.save((err, userResponseFromDb) => {
      if (err) return res.status(500).json({ msg: 'Ups', err });

      if (!userResponseFromDb)
        return res.status(500).json({ msg: "Can't create the answer!", err });

      res.json({
        userResponseFromDb,
      });
    });
  }
);

app.put(
  '/api/v1/user-response-question/:id',
  [userTokenAuth, adminRolAuth],
  (req, res) => {
    let idUserResponse = req.params.id;
    let body = req.body;

    UserResponse.findByIdAndUpdate(
      idUserResponse,
      body,
      { new: true, runValidators: true },
      (err, userResponseFromDb) => {
        if (err) {
          return res.status(400).json({
            msg: 'Something is wrong',
          });
        }

        if (!userResponseFromDb)
          return res.status(500).json({ msg: "Can't update the survey", err });
        res.json({
          userResponseFromDb,
        });
      }
    );
  }
);

module.exports = app;
