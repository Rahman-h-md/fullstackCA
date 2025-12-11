import express from 'express';
import { getBloodBanks, updateStock, createBloodBank } from '../controllers/bloodBankController.js';

const router = express.Router();

router.get('/', getBloodBanks);
router.post('/', createBloodBank);
router.put('/:id/stock', updateStock);

export default router;
