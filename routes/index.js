const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const {
    ensureAuthenticated
} = require('../config/auth');

router.get('/dashboard', ensureAuthenticated, async (req, res) => {
    const tasks = await Task.find({
        user: req.user.id
    });
    res.render('dashboard', {
        tasks
    })
});

router.get('/create', ensureAuthenticated, (req, res) => {
    res.render('create')
});

module.exports = router;