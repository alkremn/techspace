const express = require('express');
const router = express.Router();
const { authUser, googleAuth } = require('../controllers/authController');
const passport = require('passport');

// Passport Config
require('../config/passport')(passport);

router.post('/login', authUser);

router.get(
  '/google',
  passport.authenticate('google', {
    session: false,
    scope: ['email', 'profile'],
  })
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    session: false,
  }),
  googleAuth
);

module.exports = router;
