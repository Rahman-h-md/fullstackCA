import express from 'express';
import { getDoctorAppointments, updateAppointmentStatus, createPrescription, getPatientHistory } from '../controllers/doctorController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

// All routes here require Doctor role (or Admin)
router.use(protect);
router.use(authorize('Doctor', 'Admin'));

router.get('/appointments', getDoctorAppointments);
router.put('/appointments/:id/status', updateAppointmentStatus);
router.post('/prescribe', createPrescription);
router.get('/patient/:patientId/history', getPatientHistory);

export default router;
