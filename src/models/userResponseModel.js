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
});

module.exports = mongoose.model('UserResponse', userResponseCollection);
