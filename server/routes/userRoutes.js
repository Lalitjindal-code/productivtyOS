const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/profile', userController.getProfile);
router.put('/profile', userController.updateProfile);
router.get('/stats', userController.getStats);
router.get('/rpg-status', userController.getRPGStatus);
router.get('/test-user', (req, res) => res.json({ message: 'User route works' }));
router.get('/activity-feed', userController.getActivityFeed);
router.post('/select-class', userController.selectClass);

module.exports = router;
