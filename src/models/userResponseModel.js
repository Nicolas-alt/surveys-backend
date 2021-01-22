const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userResponseCollection = new Schema({
  response: {
    type: Array,
    required: [true, 'The response for survey is required'],
  },
  id_response: {
    type: Schema.Types.ObjectId,
    ref: 'Response',
    required: true,
  },
  id_question: {
    type: Schema.Types.ObjectId,
    ref: 'Question',
    required: true,
  },
  id_survey: {
    type: Schema.Types.ObjectId,
    ref: 'Survey',
    required: true,
  },
});

module.exports = mongoose.model('UserResponse', userResponseCollection);
