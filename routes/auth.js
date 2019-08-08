const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");

//User model

const User = require("../models/User");

//Login Page
router.get("/login", (req, res) => {
  res.render("login");
});

//Register Page
router.get("/register", (req, res) => {
  res.render("register");
});

//Register handler
router.post("/register", (req, res) => {
  const { name, email, password, password2 } = req.body;

  let errors = [];

  //Check required fields
  if (!name || !email || !password || !password2) {
    errors.push({
      msg: "Please fill in all fields"
    });
  }

  //Check passwords match
  if (password !== password2) {
    errors.push({
      msg: "Your passwords don't match"
    });
  }

  //Check password lenght
  if (password.length < 6) {
    errors.push({
      msg: "Your password should contain at least 6 characters"
    });
  }

  if (errors.length > 0) {
    res.render("register", {
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    //Validation passed

    User.findOne({
      email: email
    })
      //User exists
      .then(user => {
        if (user) {
          errors.push({
            msg: "Email already registered"
          });
          res.render("register", {
            errors,
            name,
            email,
            password,
            password2
          });
        } else {
          const newUser = new User({
            name,
            email,
            password
          });

          //Hash password
          bcrypt.genSalt(10, (err, salt) =>
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) {
                throw err;
              }
              //Set password to hashed
              newUser.password = hash;
              //Save user
              newUser
                .save()
                .then(user => {
                  req.flash(
                    "success_msg",
                    "You're now registered and can log in"
                  );
                  res.redirect("/auth/login");
                })
                .catch(err => console.log(err));
            })
          );
        }
      });
  }
});

//Login handler
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/auth/login",
    failureFlash: true
  })(req, res, next);
});

//Logout handler
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "You're logged out");
  res.redirect("/auth/login");
});

module.exports = router;
