const mongoose = require('mongoose');

const clickSchema = new mongoose.Schema({
    timestamp: {
        type: Date,
        default: Date.now
    },
    userAgent: {
        type: String,
    },
    ip: {
        type: String,
    }

});

const urlSchema = new mongoose.Schema({
    originalUrl: {
        type: String,
        required: true
    },
    shortCode: {
        type: String,
        unique: true
    },
    shortUrl: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    clicks: {
        type: [clickSchema],
        default: []
    }
});

module.exports = mongoose.model('Url', urlSchema);