import express from 'express';
import { registerPatient, getPatientById, getPatients } from '../controllers/patientController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .post(protect, registerPatient)
    .get(protect, getPatients);

router.route('/:id')
    .get(protect, getPatientById);

export default router;
