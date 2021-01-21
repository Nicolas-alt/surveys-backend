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
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  public: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model('Survey', surveyCollection);
