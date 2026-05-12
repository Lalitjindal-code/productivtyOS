const express = require('express');
const router = express.Router();
const c = require('../controllers/journalController');

router.get('/', c.getEntries);
router.get('/today', c.getTodayEntry);
router.get('/on-this-day', c.getOnThisDay);
router.post('/', c.upsertEntry);
router.delete('/:id', c.deleteEntry);
router.post('/summary/generate', c.generateMonthlySummary);

module.exports = router;
