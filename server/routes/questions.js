const express = require('express');
const Question = require('../models/Question');

const router = express.Router();

const fetchAllQuestions = async () => {
    try {
        questionCache = await Question.find();
        console.log(`Loaded ${questionCache.length} questions into cache.`);
    } catch (error) {
        console.error('Error fetching questions:', error);
    }
};

fetchAllQuestions();

router.get('/', async (req, res) => {
    try {
        const questions = await Question.find();
        res.json(questions);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching questions', error });
    }
});

router.get('/search', async (req, res) => {
    const query = req.query.q || '';
    const type = req.query.type || 'All';

    try {
        let searchQuery = { title: new RegExp(query, 'i') };

        if (type !== 'All') {
            searchQuery.type = type;
        }

        const questions = await Question.find(searchQuery)
        res.json(questions);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching questions', error });
    }
});


module.exports = router;
