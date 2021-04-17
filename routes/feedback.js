const express = require("express");
const {
  getUserConfig,
  getAdminConfig,
  transporter,
} = require("../config/feedback");
const router = express.Router();

router.route("/").post(async (req, res) => {
  const userConfig = getUserConfig(req);
  const adminConfig = getAdminConfig(req);

  transporter.sendMail(userConfig, (err, info) => {
    transporter.sendMail(adminConfig, (err, info) => {
      res.redirect("/");
    });
  });
});

module.exports = {
  feedbackRouter: router,
};
