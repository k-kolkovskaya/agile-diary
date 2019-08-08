const mongoose = require('mongoose');
const ObjectId = require("mongoose").Types.ObjectId;


const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        isRequired: true
    },
    isCompleted: {
        type: Boolean,
        isRequired: true
    },
    user: {
        ref: 'user',
        type: ObjectId
    }
});

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;
