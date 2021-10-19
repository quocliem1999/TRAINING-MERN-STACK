const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  birthday: {
    type: String,
    required: true,
  },
  sdt: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  degree: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  skill: {
    type: String,
    required: true,
  },
  hobby: {
    type: String,
    required: true,
  },
  target: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ['Nam', 'Nữ'],
    required: true,
  },
  account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

module.exports = mongoose.model('Profile', ProfileSchema);
