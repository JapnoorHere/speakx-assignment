const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    id: String,
    title: String,
    type: String,
    difficulty: String,
    category: String,
    options: [
        {
            text: String,
            isCorrectAnswer: Boolean
        }
    ], 
    answer: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('Question', questionSchema);
