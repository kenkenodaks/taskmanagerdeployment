const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const auth = require('../middleware/authMiddleware');
const taskController = require('../controllers/taskController');

router.get('/', auth, taskController.getTasks);

router.post('/', auth, [
  body('title').notEmpty().withMessage('Title is required'),
  body('status').optional().isIn(['todo','in-progress','done'])
], taskController.createTask);

router.put('/:id', auth, [
  body('status').optional().isIn(['todo','in-progress','done'])
], taskController.updateTask);

router.delete('/:id', auth, taskController.deleteTask);

module.exports = router;
