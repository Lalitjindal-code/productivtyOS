const express = require('express');
const router = express.Router();
const gymController = require('../controllers/gymController');

router.get('/exercises', gymController.getExerciseLibrary);
router.get('/workouts', gymController.getWorkouts);
router.post('/workouts', gymController.logWorkout);
router.get('/exercises/:exerciseId/progress', gymController.getExerciseProgress);
router.get('/plan', gymController.getGymPlan);
router.put('/plan', gymController.updateGymPlan);

module.exports = router;
