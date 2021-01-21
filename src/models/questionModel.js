const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let questionCollection = new Schema({
  description: {
    type: String,
    required: [true, 'The description is required'],
  },
  image: {
    type: String,
    required: false,
  },
  id_survey: {
    type: Schema.Types.ObjectId,
    ref: 'Survey',
    required: true,
  },
});

module.exports = mongoose.model('Question', questionCollection);
