const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { shortenUrl, redirectUrl, getAnalytics  } = require('../controllers/urlController.js');

router.post('/shorten', auth, shortenUrl);
router.get('/analytics', auth, getAnalytics);
router.get('/:shortCode', redirectUrl);

module.exports = router

