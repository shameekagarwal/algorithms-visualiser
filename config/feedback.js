const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_MAILID,
    pass: process.env.GMAIL_PASSWORD,
  },
});

const getUserConfig = (req) => {
  return {
    from: "shameek.agarwal@gmail.com",
    to: req.user.emailid,
    subject: "Feedback on algorithms_visualiser",
    text: `Thanks a lot for sharing you feedback ${req.user.username}!`,
  };
};

const getAdminConfig = (req) => {
  return {
    from: "shameek.agarwal@gmail.com",
    to: "shameek.agarwal@gmail.com",
    subject: "Feedback on algorithms_visualiser",
    html: `${req.user.username}<br />${req.user.emailid}<br />${req.body.experience}<br />${req.body.suggestionid}`,
  };
};

module.exports = {
  transporter,
  getUserConfig,
  getAdminConfig,
};
