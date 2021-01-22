const express = require('express');
const app = express();

const Question = require('../models/questionModel');
const userTokenAuth = require('../middlewares/UserAuth');
const adminRolAuth = require('../middlewares/UserRole');

// All

app.get('/api/v1/question', [userTokenAuth], (req, res) => {
  Question.find({})
    .populate('id_survey')
    .exec((err, questions) => {
      if (err) return res.status(400).json({ msg: 'Ups', err });

      Question.count({}, (err, totalSurveys) => {
        if (err) return res.status(400).json({ msg: 'Ups', err });

        res.json({
          totalSurveys,
          questions,
        });
      });
    });
});

app.post('/api/v1/question', [userTokenAuth, adminRolAuth], (req, res) => {
  let dataBody = req.body;

  let question = new Question({
    description: dataBody.description,
    image: dataBody.image,
    id_survey: dataBody.id_survey,
  });

  question.save((err, questionFromDb) => {
    if (err) return res.status(500).json({ msg: 'Ups', err });

    if (!questionFromDb)
      return res.status(500).json({ msg: "Can't create the question", err });

    res.json({
      questionFromDb,
    });
  });
});

app.put('/api/v1/question/:id', [userTokenAuth, adminRolAuth], (req, res) => {
  let idQuestion = req.params.id;
  let body = req.body;

  Question.findByIdAndUpdate(
    idQuestion,
    body,
    { new: true, runValidators: true },
    (err, questionFromDb) => {
      if (err) {
        return res.status(400).json({
          msg: 'Something is wrong',
        });
      }

      if (!questionFromDb)
        return res.status(500).json({ msg: "Can't update the survey", err });
      res.json({
        questionFromDb,
      });
    }
  );
});

app.delete(
  '/api/v1/question/:id',
  [userTokenAuth, adminRolAuth],
  (req, res) => {
    let idQuestion = req.params.id;

    Question.findByIdAndRemove(idQuestion, (err, questionFromDb) => {
      if (err) return res.status(500).json({ msg: 'Ups', err });

      if (!questionFromDb)
        return res.status(500).json({ msg: "Can't delete the question", err });
    });

    res.status(200).json({ msg: 'Question delete!' });
  }
);

module.exports = app;
