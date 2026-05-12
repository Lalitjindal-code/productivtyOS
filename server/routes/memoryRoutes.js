const express = require('express');
const router = express.Router();
const memoryController = require('../controllers/memoryController');

router.get('/', memoryController.getMemory);
router.post('/insights/generate', memoryController.generateInsights);
router.patch('/insights/:insightId/flag', memoryController.flagInsight);
router.post('/notes', memoryController.addNote);
router.delete('/notes/:noteId', memoryController.deleteNote);
router.post('/chat', memoryController.chat);

module.exports = router;
