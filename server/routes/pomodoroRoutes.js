const express = require('express');
const router = express.Router();
const pomodoroController = require('../controllers/pomodoroController');

router.post('/', pomodoroController.logSession);
router.get('/stats/daily', pomodoroController.getDailyStats);

module.exports = router;
