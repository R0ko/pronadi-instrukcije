const express = require('express');
const router = express.Router();

// @route   GET api/instructorData
// @desc    Get all instructor data
// @access  Private
router.get('/', (req, res) => {
  res.send('Get all instructor data');
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
