const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { shortenUrl, redirectUrl, getAnalytics  } = require('../controllers/urlController.js');

router.post('/shorten', auth, shortenUrl);
router.get('/:shortCode', redirectUrl);
router.get('/analytics', auth, getAnalytics);

module.exports = router

