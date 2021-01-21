const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;

let userCollection = new Schema({
  userName: {
    type: String,
    required: [true, 'The user name is required'],
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'The email is required'],
  },
  password: {
    type: String,
    required: [true, 'The password is required'],
  },
  country: {
    type: String,
    required: false,
  },
  age: {
    type: Number,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    default: 'user',
    enum: {
      values: ['user', 'admin'],
      message: '{VALUE} not exist',
    },
  },
});

userCollection.plugin(uniqueValidator, { message: '{PATH} already register' });

module.exports = mongoose.model('User', userCollection);
