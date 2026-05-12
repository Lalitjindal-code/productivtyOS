const express = require('express');
const router = express.Router();
const goalController = require('../controllers/goalController');

router.route('/')
  .get(goalController.getGoals)
  .post(goalController.createGoal);

router.route('/:id')
  .put(goalController.updateGoal)
  .delete(goalController.deleteGoal);

router.patch('/:id/milestones/:milestoneId', goalController.toggleMilestone);

module.exports = router;
