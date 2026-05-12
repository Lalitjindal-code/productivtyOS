const express = require('express');
const router = express.Router();
const rageController = require('../controllers/rageController');

router.post('/roast/:taskId', rageController.generateRoast);
router.get('/wall', rageController.getWallOfShame);
router.post('/penalty/:taskId', rageController.createPenaltyTask);
router.post('/shame-report', rageController.generateShameReport);

module.exports = router;
