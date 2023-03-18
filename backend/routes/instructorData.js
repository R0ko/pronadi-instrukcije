const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const InstructorCard = require('../models/InstructorCard');

// @route   GET api/instructorData
// @desc    Get all instructor data
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const instructorData = await InstructorCard.find({
      user: req.user.id,
    }).sort({ date: -1 });
    res.json(instructorData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/instructorData
// @desc    Add new instructor data
// @access  Private
router.post(
  '/',
  [auth, [check('name', 'Name is required').not().isEmpty()]],
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
        user: req.user.id,
      });
      const instructorCard = await newInstructorCard.save();
      res.json(instructorCard);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   PUT api/instructorData/:id
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
  const instructorDataFields = {};
  if (name) instructorDataFields.name = name;
  if (email) instructorDataFields.email = email;
  if (phone) instructorDataFields.phone = phone;
  if (subject) instructorDataFields.subject = subject;
  if (price) instructorDataFields.price = price;
  if (distance) instructorDataFields.distance = distance;
  if (numberOfInstructionsHeld)
    instructorDataFields.numberOfInstructionsHeld = numberOfInstructionsHeld;
  if (date) instructorDataFields.date = date;

  try {
    let instructor = await InstructorCard.findById(req.params.id);
    if (!instructor)
      return res.status(404).json({ msg: 'Instructor not found' });
    // Make sure user owns instructor (nepotrebno)
    if (instructor.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized!' });
    }
    instructor = await InstructorCard.findByIdAndUpdate(
      req.params.id,
      { $set: instructorDataFields },
      { new: true }
    );
    res.json(instructor);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/instructorData/:id
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
