const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

dotenv.config();
const app = express();
const Port = process.env.PORT || 3000;

// Middlewares
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
});
app.use(limiter);

// Routes
app.use('/api/urls', require('./routes/urlRoutes.js'));
app.use('/api/admin', require('./routes/adminRoutes.js'));
app.use('/api/auth', require('./routes/authRoutes.js'));

// DB Connection and Server Start
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        app.listen(Port, () => console.log(`MongoDB connected and Server started on port ${Port}`));
    })
    .catch((error) => console.error('MongoDB connection error:', error));
