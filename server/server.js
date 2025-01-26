const express = require('express');
const connectDB = require('./config/db');
const questionRoutes = require('./routes/questions');
const cors = require('cors');
require('dotenv').config();

connectDB();

const app = express();
app.use(cors({
    origin: '*', credentials: true
}));
app.use(express.json());

app.use('/api/questions', questionRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
