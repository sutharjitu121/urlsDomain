const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
const Port = process.env.PORT || 3000
const helmet = require('helmet');

dotenv.config();

const app = express();
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(rateLimit)

app.use('/api/urls', require('./routes/urlRoutes.js'));
app.use('/api/admin', require('./routes/adminRoutes.js'));
app.use('/api/auth', require('./routes/authRoutes.js'));

app.listen(Port, () => console.log(`Server started on port ${Port}`));

mongoose.connect(process.env.MONGODB_URI)
    .then(() => app.listen(process.env.PORT, () => console.log(`MongoDB connected and Server started on port ${Port}`)))
    .catch((error) => console.log(error));

