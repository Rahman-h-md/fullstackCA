import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
    getAlerts,
    getActiveAlerts,
    acknowledgeAlert,
    resolveAlert,
    dismissAlert,
    createAlert
} from '../controllers/alertController.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

router.get('/', getAlerts);
router.get('/active', getActiveAlerts);
router.post('/', createAlert);
router.put('/:id/acknowledge', acknowledgeAlert);
router.put('/:id/resolve', resolveAlert);
router.put('/:id/dismiss', dismissAlert);

export default router;
