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

  if (!title) {
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

router.post("/complete", ensureAuthenticated, async (req, res) => {
  try {
    console.log(req.body);
    const task = await Task.findById(req.body.id);
    task.isCompleted ? task.isCompleted = false : task.isCompleted = true;
    await task.save();
  } catch (err) {
    console.log(err);
  }

  res.redirect("/dashboard");
});

router.delete("/delete", ensureAuthenticated, async (req, res) => {
  try {
    console.log(req.body);
    const task = await Task.findById(req.body.id);
    await task.delete();
  } catch (err) {
    console.log(err);
  }

  res.send("/dashboard");
});

router.post("/update", ensureAuthenticated, async (req, res) => {
  try {
    const value = req.body.value;
    let errors = [];

  if (!value) {
    errors.push({
      msg: "You need to fill your task"
    })
  }

  if (errors.length > 0) {
    res.render("update", {
      errors,
      value
    });
  } else {
    const task = await Task.findById(req.body.id);
    task.title = value;
    await task.save();
  }} catch (err) {
    console.log(err);
  }

  res.send("/dashboard");
});

module.exports = router;