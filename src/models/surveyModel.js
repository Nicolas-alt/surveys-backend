const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let surveyCollection = new Schema({
  title: {
    type: String,
    required: [true, 'The title is required'],
  },
  description: {
    type: String,
    required: false,
  },
  id_user: {
    type: String,
    required: true,
  },
  public: {
    type: Boolean,
    required: true,
    default: true,
  },
});

module.exports = mongoose.model('User', surveyCollection);
