const asyncHandler = require('express-async-handler');
const User = require('../models/User');

// @desc Get all users from database
// @route GET /api/v1/users
// @access Private

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select('-password');
  if (users) {
    res.json(users);
  } else {
    res.status(500);
    throw new Error('Invalid request');
  }
});

module.exports = {
  getUsers,
};
