import express from 'express';
import { protect } from '../middleware/auth.js';
import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  getTaskStats
} from '../controllers/taskController.js';

const router = express.Router();

// All task routes require authentication
router.use(protect);

router.get('/stats/summary', getTaskStats);
router.get('/', getTasks);
router.post('/', createTask);
router.get('/:id', getTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;
