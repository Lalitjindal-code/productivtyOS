const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Standard CRUD
router.route('/')
  .get(taskController.getTasks)
  .post(taskController.createTask);

router.route('/:id')
  .put(taskController.updateTask)
  .delete(taskController.deleteTask);

// Phase features
router.post('/:id/complete', taskController.completeTask);
router.post('/:id/fail', taskController.failTask);

// Subtask features
router.post('/:id/subtasks', taskController.addSubtask);
router.patch('/:id/subtasks/:subtaskId', taskController.toggleSubtask);
router.delete('/:id/subtasks/:subtaskId', taskController.deleteSubtask);

module.exports = router;
