const express = require('express');
const Question = require('../models/Question');

const router = express.Router();

router.get('/', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const type = req.query.type || '';
    const search = req.query.search || '';

    try {
        let query = {};

        if (type) {
            query.type = type;
        }

        if (search) {
            query.title = { $regex: search, $options: 'i' };
        }

        const totalQuestions = await Question.countDocuments(query);
        const questions = await Question.find(query)
            .skip((page - 1) * limit)
            .limit(limit);

        res.json({
            questions,
            totalPages: Math.ceil(totalQuestions / limit),
            currentPage: page,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching questions', error });
    }
});

router.get('/search', async (req, res) => {
    const query = req.query.q || '';
    const type = req.query.type || '';

    try {
        let searchQuery = { title: new RegExp(query, 'i') };
        if (type) {
            searchQuery.type = type;
        }

        const questions = await Question.find(searchQuery);
        res.json(questions);
    } catch (error) {
        res.status(500).json({ message: 'Error searching questions', error });
    }
});

module.exports = router;
