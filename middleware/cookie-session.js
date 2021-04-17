const cookieSession = require("cookie-session");

const cookieSessionConfig = cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [process.env.COOKIE_SECRET],
});

module.exports = {
  cookieSession: cookieSessionConfig,
};
