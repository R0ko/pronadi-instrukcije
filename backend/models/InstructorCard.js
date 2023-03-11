const mongoose = require('mongoose');
const InstructorSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  // TODO: Add more parameters for instructor cards for each user
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  subject: {
    type: String,
    default: 'Matematika',
  },
  price: {
    type: String,
    default: '0€',
  },
  distance: {
    type: String,
    default: '0,0',
  },
  numberOfInstructionsHeld: {
    type: String,
    default: '0',
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('instructor', InstructorSchema);
