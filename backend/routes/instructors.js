const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const InstructorCard = require('../models/InstructorCard');

// @route   GET api/instructors
// @desc    Get all instructor data
// @access  Public
router.get('/', async (req, res) => {
  try {
    const instructors = await InstructorCard.find().sort({ date: -1 });
    res.json(instructors);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/instructors
// @desc    Add new instructor data
// @access  Public
router.post(
  '/',
  [check('name', 'Name is required').not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      name,
      email,
      phone,
      subject,
      price,
      distance,
      numberOfInstructionsHeld,
      date,
    } = req.body;

    try {
      const newInstructorCard = new InstructorCard({
        name,
        email,
        phone,
        subject,
        price,
        distance,
        numberOfInstructionsHeld,
        date,
      });
      const instructorCard = await newInstructorCard.save();
      res.json(instructorCard);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   PUT api/instructors/:id
// @desc    Update instructor data
// @access  Private
router.put('/:id', auth, async (req, res) => {
  const {
    name,
    email,
    phone,
    subject,
    price,
    distance,
    numberOfInstructionsHeld,
    date,
  } = req.body;

  // Build instructor data
  const instructorsFields = {};
  if (name) instructorsFields.name = name;
  if (email) instructorsFields.email = email;
  if (phone) instructorsFields.phone = phone;
  if (subject) instructorsFields.subject = subject;
  if (price) instructorsFields.price = price;
  if (distance) instructorsFields.distance = distance;
  if (numberOfInstructionsHeld)
    instructorsFields.numberOfInstructionsHeld = numberOfInstructionsHeld;
  if (date) instructorsFields.date = date;

  try {
    let instructor = await InstructorCard.findById(req.params.id);
    if (!instructor)
      return res.status(404).json({ msg: 'Instructor not found' });
    // Make sure user owns instructor (nepotrebno)
    // Make sure user is the instructor (potrebno)
    if (instructor.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized!' });
    }
    instructor = await InstructorCard.findByIdAndUpdate(
      req.params.id,
      { $set: instructorsFields },
      { new: true }
    );
    res.json(instructor);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/instructors/:id
// @desc    Delete instructor data
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let instructor = await InstructorCard.findById(req.params.id);
    if (!instructor)
      return res.status(404).json({ msg: 'Instructor not found' });
    // Make sure user owns instructor (nepotrebno)
    if (instructor.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized!' });
    }
    await InstructorCard.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Contact removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
