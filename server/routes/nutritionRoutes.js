import express from 'express';
import { getNutritionPlans, createNutritionPlan, seedNutritionData } from '../controllers/nutritionController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getNutritionPlans);
router.post('/', protect, authorize('Admin', 'Doctor'), createNutritionPlan);
router.post('/seed', protect, authorize('Admin'), seedNutritionData); // Temporary endpoint for demo

export default router;
