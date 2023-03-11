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
router.post('/', (req, res) => {
  res.send('Add new instructor data');
});

// @route   PUT api/instructorData/:id
// @desc    Update instructor data
// @access  Private
router.put('/:id', (req, res) => {
  res.send('Update instructor data');
});

// @route   DELETE api/instructorData/:id
// @desc    Delete instructor data
// @access  Private
router.delete('/:id', (req, res) => {
  res.send('Delete instructor data');
});

module.exports = router;
