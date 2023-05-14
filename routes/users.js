const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

const User = require('../models/User');

// @route   POST api/users
// @desc    Register a user
// @access  Public
router.post(
  '/',
  [
    // Validators for user signup
    check('name', 'Please add name').not().isEmpty(),
    check('surname', 'Please add surname').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 8 or more charactes'
    ).isLength({ min: 8 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, surname, email, password, userType } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      user = new User({
        name,
        surname,
        email,
        password,
        userType,
      });
      // Password hashing
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   PUT api/users/:id
// @desc    Update user data
// @access  Private
router.put('/:id', auth, async (req, res) => {
  const { name, surname, email, userType, rating } = req.body;

  // Build user data
  const userFields = {};
  if (name) userFields.name = name;
  if (surname) userFields.surname = surname;
  if (email) userFields.email = email;
  if (userType) userFields.userType = userType;
  if (rating) userFields.rating = rating;

  try {
    let user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    // Make sure if logged-in user is the same as the user to be updated
    if (req.user.id !== user.id) {
      return res.status(401).json({ msg: 'Not authorized!' });
    }
    // Perform any additional checks, before updating user (e.g. MFA..)
    user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: userFields },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/users/:id/password
// @desc    Update user password
// @access  Private
router.put('/:id/password', auth, async (req, res) => {
  const { password } = req.body;

  // Hash the new password
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    let user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    // Make sure logged-in user is the same as the user to be updated
    if (req.user.id !== user.id) {
      return res.status(401).json({ msg: 'Not authorized!' });
    }

    // Update user password
    user.password = hashedPassword;
    await user.save();

    res.json({ msg: 'Password updated successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/users
// @desc    Get all user data
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const users = await User.find({ userType: '1' }, { password: 0 }).sort({
      date: -1,
    });
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/users/me
// @desc    Get logged-in user data
// @access  Private
// router.get('/me', auth, async (req, res) => {
//   try {
//     const loggedInUserId = req.user.id;
//     const user = await User.findById(loggedInUserId, { password: 0 });
//     if (!user) {
//       return res.status(404).json({ msg: 'User not found' });
//     }
//     res.json(user);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });

// @route   DELETE api/users/:id
// @desc    Delete user data
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: 'User not found' });
    // Make sure if logged-in user is the same as the user to be deleted
    if (req.user.id !== user.id) {
      return res.status(401).json({ msg: 'Not authorized!' });
      // Perform any additional checks, before updating user (e.g. MFA..)
    }
    await User.findByIdAndRemove(req.params.id);
    res.json({ msg: 'User deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
