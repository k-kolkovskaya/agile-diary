const express = require("express");
const router = express.Router();
const {
  ensureAuthenticated
} = require("../config/auth");
const Task = require("../models/Task");

router.get("/create", ensureAuthenticated, (req, res) => {
  res.render("create");
});

router.post("/create", async (req, res) => {

  const title = req.body.title;
  let errors = [];

  if(!title) {
    errors.push({
      msg: "You need to fill your task"
    })
  }

  if (errors.length > 0) {
    res.render("create", {
      errors,
      title
    });
  } else {
    const task = new Task({
      title: req.body.title,
      isCompleted: false,
      user: req.user.id
    });
    await task.save();
    res.redirect("/dashboard");
  }
});

router.get("/complete", async (req, res) => {
  const tasks = await Task.find({
    user: req.user.id
  });
  res.send(tasks);
});

router.post("/complete", async (req, res) => {
  try {
    const task = await Task.findById(req.body.id);
    task.isCompleted ? task.isCompleted = false : task.isCompleted = true;
    await task.save();
  } catch (err) {
    console.log(err);
  }

  res.redirect("/dashboard");
  req.flash("success_msg", "Your task have been added");
});

module.exports = router;
