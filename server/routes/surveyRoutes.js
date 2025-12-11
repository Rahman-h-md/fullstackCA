import express from 'express';
import { createSurvey, getSurveys } from '../controllers/surveyController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware(['ASHA', 'Admin', 'Doctor']), createSurvey);
router.get('/', authMiddleware(['Admin', 'Doctor']), getSurveys);

export default router;
