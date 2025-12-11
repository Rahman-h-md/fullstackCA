import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
    getHealthVisits,
    getPatientVisits,
    createHealthVisit,
    updateHealthVisit,
    deleteHealthVisit
} from '../controllers/healthVisitController.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

router.get('/', getHealthVisits);
router.get('/patient/:patientId', getPatientVisits);
router.post('/', createHealthVisit);
router.put('/:id', updateHealthVisit);
router.delete('/:id', deleteHealthVisit);

export default router;
