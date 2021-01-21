const express = require('express');
const app = express();

const Survey = require('../models/surveyModel');
const userTokenAuth = require('../middlewares/UserAuth');
const adminRolAuth = require('../middlewares/UserRole');

// All
app.get('/api/v1/surveys', [userTokenAuth], (req, res) => {
  let startFrom = req.query.start || 0;
  startFrom = Number(startFrom);

  Survey.find({})
    .skip(startFrom)
    .limit(15)
    .populate('id_user')
    .exec((err, surveys) => {
      if (err) return res.status(400).json({ msg: 'Ups', err });

      Survey.count({}, (err, totalSurveys) => {
        if (err) return res.status(400).json({ msg: 'Ups', err });

        res.json({
          totalSurveys,
          surveys,
        });
      });
    });
});

// One
app.get('/api/v1/surveys/:name', [userTokenAuth], (req, res) => {
  let titleSurvey = req.params.name;

  let regex = new RegExp(titleSurvey, 'i');

  Survey.find({ title: regex }, (err, surveyFromDb) => {
    if (err) {
      return res.status(400).json({
        msg: 'Something is wrong',
      });
    }

    if (!surveyFromDb) return res.status(500).json({ msg: 'Ups', err });
    res.json({
      surveyFromDb,
    });
  });
});

app.post('/api/v1/surveys', [userTokenAuth, adminRolAuth], (req, res) => {
  let dataBody = req.body;
  let survey = new Survey({
    title: dataBody.title,
    description: dataBody.description,
    id_user: req.user._id,
    public: dataBody.public,
  });

  survey.save((err, surveyFromDb) => {
    if (err) return res.status(500).json({ msg: 'Ups', err });

    if (!surveyFromDb)
      return res.status(500).json({ msg: "Can't create the survey", err });

    res.json({
      surveyFromDb,
    });
  });
});

app.put('/api/v1/surveys/:id', [userTokenAuth, adminRolAuth], (req, res) => {
  let idSurvey = req.params.id;
  let body = req.body;

  Survey.findByIdAndUpdate(
    idSurvey,
    body,
    { new: true, runValidators: true },
    (err, surveyFromDb) => {
      if (err) {
        return res.status(400).json({
          msg: 'Something is wrong',
        });
      }

      if (!surveyFromDb)
        return res.status(500).json({ msg: "Can't update the survey", err });
      res.json({
        surveyFromDb,
      });
    }
  );
});

app.delete('/api/v1/surveys/:id', [userTokenAuth, adminRolAuth], (req, res) => {
  let idSurvey = req.params.id;
  Survey.findByIdAndRemove(idSurvey, (err, surveyFromDb) => {
    if (err) return res.status(500).json({ msg: 'Ups', err });

    if (!surveyFromDb)
      return res.status(500).json({ msg: "Can't delete the survey", err });
  });

  res.status(200).json({ msg: 'Survey delete!' });
});

module.exports = app;
