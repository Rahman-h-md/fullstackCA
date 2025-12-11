import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
    getTasks,
    getPendingTasks,
    getCompletedTasks,
    createTask,
    updateTask,
    completeTask,
    deleteTask
} from '../controllers/taskController.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

router.get('/', getTasks);
router.get('/pending', getPendingTasks);
router.get('/completed', getCompletedTasks);
router.post('/', createTask);
router.put('/:id', updateTask);
router.put('/:id/complete', completeTask);
router.delete('/:id', deleteTask);

export default router;
