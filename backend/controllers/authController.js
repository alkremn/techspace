const asyncHandler = require('express-async-handler');
const generateToken = require('../utils/generateToken');
const User = require('../models/User');

// @desc Auth user & get token
// @route POST /api/v1/users/login
// @access Public

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body; 

  const user = await User.findOne({ email });
  if (user && user.matchPassword(password)) {
    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      initials: user.initials,
      displayName: user.displayName,
      photoUrl: user.photoUrl,
      isAdmin: user.isAdmin,
      isSecond: user.isSecond,
      token: generateToken(user.id),
    });
  } else {
    res.status(401); 
    throw new Error('Invalid email or password');
  }
});

const googleAuth = asyncHandler(async (req, res) => {
  console.log(generateToken(req.user._id));
  res.set('token', generateToken(req.user._id));
  res.redirect('/');
});

module.exports = {
  authUser,
  googleAuth,
};
