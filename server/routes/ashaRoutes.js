import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
    getDashboardSummary,
    getAssignedPatients,
    getHighRiskPatients,
    getPatientDetails,
    addPatient,
    updatePatient
} from '../controllers/ashaController.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

// Dashboard
router.get('/dashboard', getDashboardSummary);

// Patient management
router.get('/patients', getAssignedPatients);
router.get('/patients/high-risk', getHighRiskPatients);
router.get('/patients/:id', getPatientDetails);
router.post('/patients', addPatient);
router.put('/patients/:id', updatePatient);

export default router;
