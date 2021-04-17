const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const User = require("../models/user");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      callbackURL: "/auth/google/redirect",
      clientID: process.env.OAUTH_CLIENT_ID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      proxy: true,
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleid: profile.id }).then((currentuser) => {
        if (currentuser) {
          done(null, currentuser);
        } else {
          new User({
            username: profile.displayName,
            googleid: profile.id,
            emailid: profile.emails[0].value,
          })
            .save()
            .then((newuser) => {
              done(null, newuser);
            });
        }
      });
    }
  )
);
