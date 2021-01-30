const GoogleStrategy = require('passport-google-oauth2').Strategy;
const User = require('../models/User');

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/api/v1/auth/google/callback',
        passReqToCallback: true,
      },
      async (request, acessToken, refreshToken, profile, done) => {
        console.log(profile.name.givenName, profile.name.familyName);
        const user = await User.find({
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
        });

        done(null, user);
      }
    )
  );
};
