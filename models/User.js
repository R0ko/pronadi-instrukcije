const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  user_type: {
    type: Number,
    default: '0', // 0 for student,  1 for instructor, 2 for premium instructor
  },
  rating: {
    type: Number,
    default: '0',
  },
  instructorData: {
    subjects: {
      type: Array,
      default: [''],
    },
    price: {
      type: Number,
      default: '0',
    },
    numberofInstructions: {
      type: Number,
      default: '0',
    },
  },
});

module.exports = mongoose.model('user', UserSchema);
