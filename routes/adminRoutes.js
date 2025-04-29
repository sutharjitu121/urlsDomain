const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');
const { getAllAnalytics, deleteUrl, blockUser } = require('../controllers/adminController');

router.use(auth, admin);
router.get('/analytics', getAllAnalytics)
router.delete('/delete/:id', deleteUrl)
router.put('/user/:id', blockUser)

module.exports = router

