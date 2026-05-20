const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

// All user routes require authentication
router.get('/profile', auth, userController.getProfile);
router.put('/profile', auth, userController.updateProfile);
router.get('/stats', auth, userController.getStats);
router.get('/rpg-status', auth, userController.getRPGStatus);
router.get('/activity-feed', auth, userController.getActivityFeed);
router.post('/select-class', auth, userController.selectClass);
router.post('/mobile/register', auth, userController.registerMobileDevice);
router.post('/mobile/push-token', auth, userController.updateFCMToken);
router.post('/mobile/trigger-lock', auth, userController.triggerMobileFocusLock);

module.exports = router;
