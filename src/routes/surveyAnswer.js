const express = require('express');
const app = express();

const Response = require('../models/responseModel');
const userTokenAuth = require('../middlewares/UserAuth');
const adminRolAuth = require('../middlewares/UserRole');

// All
app.get('/api/v1/response', [userTokenAuth], (req, res) => {
  Response.find({})
    .populate('id_question')
    .exec((err, responseQuestion) => {
      if (err) return res.status(400).json({ msg: 'Ups', err });

      Response.count({}, (err, response) => {
        if (err) return res.status(400).json({ msg: 'Ups', err });

        res.json({
          response,
          responseQuestion,
        });
      });
    });
});

app.post('/api/v1/response', [userTokenAuth, adminRolAuth], (req, res) => {
  let dataBody = req.body;

  let response = new Response({
    response: dataBody.response,
    multipleResponse: dataBody.multiple,
    id_question: dataBody.id_question,
  });

  response.save((err, responseFromDb) => {
    if (err) return res.status(500).json({ msg: 'Ups', err });

    if (!responseFromDb)
      return res.status(500).json({ msg: "Can't create the survey", err });

    res.json({
      responseFromDb,
    });
  });
});

app.put('/api/v1/response/:id', [userTokenAuth, adminRolAuth], (req, res) => {
  let idResponseQuestion = req.params.id;
  let body = req.body;

  Response.findByIdAndUpdate(
    idResponseQuestion,
    body,
    { new: true, runValidators: true },
    (err, responseQuestionFromDb) => {
      if (err) {
        return res.status(400).json({
          msg: 'Something is wrong',
        });
      }

      if (!responseQuestionFromDb)
        return res.status(500).json({ msg: "Can't update the survey", err });
      res.json({
        responseQuestionFromDb,
      });
    }
  );
});

app.delete(
  '/api/v1/response/:id',
  [userTokenAuth, adminRolAuth],
  (req, res) => {
    let idResponse = req.params.id;
    Response.findByIdAndRemove(idResponse, (err, responseFromDb) => {
      if (err) return res.status(500).json({ msg: 'Ups', err });

      if (!responseFromDb)
        return res.status(500).json({ msg: "Can't delete the survey", err });
    });

    res.status(200).json({ msg: 'Response delete!' });
  }
);

module.exports = app;
