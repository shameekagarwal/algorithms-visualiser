const authGuard = (req, res, next) => {
  if (req.user) {
    return next();
  } else {
    res.redirect("/auth");
  }
};

module.exports = {
  authGuard,
};
