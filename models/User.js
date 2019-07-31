const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        isRequired: true
    },
    email: {
        type: String,
        isRequired: true
    },
    password: {
        type: String,
        isRequired: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;