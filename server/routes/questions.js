const express = require('express');
const Question = require('../models/Question');

const router = express.Router();



router.get('/', async (req, res) => {
    try {
        const questions = await Question.find();
        console.log(questions);
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

        const questions = await Question.find(searchQuery).limit(10);
        
        res.json(questions);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching questions', error });
    }
});


module.exports = router;
