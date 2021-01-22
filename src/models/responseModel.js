const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let responseCollection = new Schema({
  response: {
    type: Array,
    required: [true, 'The response for survey is required'],
  },
  multipleResponse: {
    type: Boolean,
    default: true,
    required: true,
  },
  id_question: {
    type: Schema.Types.ObjectId,
    ref: 'Question',
    required: true,
  },
});

module.exports = mongoose.model('Response', responseCollection);
