const express = require("express");
const router = express.Router();
const passport = require("passport");
const path = require("path");

router.route("/google").get(
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
  })
);

router
  .route("/google/redirect")
  .get(passport.authenticate("google"), (req, res, next) => {
    res.redirect("/algorithms.html");
  });

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views/enter.html"));
});

module.exports = {
  authRouter: router,
};
