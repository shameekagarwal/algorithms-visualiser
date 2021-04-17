require("dotenv").config();
require("./config/oauth");
require("./config/db");

const passport = require("passport");
const express = require("express");

const { authRouter } = require("./routes/auth");
const { feedbackRouter } = require("./routes/feedback");

const { cookieSession } = require("./middleware/cookie-session");
const { authGuard } = require("./middleware/auth-guard");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieSession);
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRouter);
app.use(authGuard);

app.use(express.static(__dirname + "/views"));
app.use("/feedback", feedbackRouter);

app.use((req, res, next) => res.redirect("/algorithms.html"));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`running on port ${port}`));
