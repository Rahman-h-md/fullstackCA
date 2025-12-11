import express from 'express';
import { getDoctors, bookAppointment, getMyAppointments } from '../controllers/appointmentController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

// Get list of doctors (Any authenticated user can see?) - Yes
router.get('/doctors', getDoctors);

// Book appointment (Only Patient - or maybe anyone?) - Let's allow Patient
router.post('/', authorize('Patient'), bookAppointment);

// Get my appointments (Patient)
router.get('/my', authorize('Patient'), getMyAppointments);

export default router;
