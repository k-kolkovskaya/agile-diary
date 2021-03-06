const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 5000;

const app = express();

app.use(bodyParser());

//Passport config
require("./config/passport")(passport);

//DB config
const db = require("./config/keys").MongoURI;

//Connect to Mongo
mongoose
  .connect(db, {
    useNewUrlParser: true
  })
  .then(() => console.log("Mongo DB connected"))
  .catch(err => console.log(err));

//Ejs
app.use(expressLayouts);
app.set("view engine", "ejs");

//Bodyparser
app.use(
  express.urlencoded({
    extended: false
  })
);

//Express session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
  })
);

//Passport middlewear
app.use(passport.initialize());
app.use(passport.session());

//Connect flash
app.use(flash());

//Global vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

//Styles
app.use(express.static(path.join(__dirname, "public")));

//Routes
app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/auth"));
app.use("/api", require("./routes/tasks"));

app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}`);
});