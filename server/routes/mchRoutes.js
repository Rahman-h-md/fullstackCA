import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
    getPregnancies,
    getPregnancyByPatient,
    createPregnancy,
    addANCVisit,
    addPNCVisit,
    updateDeliveryOutcome
} from '../controllers/mchController.js';
import {
    getImmunizations,
    getImmunizationByChild,
    createImmunization,
    updateVaccineStatus,
    addGrowthData
} from '../controllers/immunizationController.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

// Pregnancy tracking routes
router.get('/pregnancies', getPregnancies);
router.get('/pregnancy/:patientId', getPregnancyByPatient);
router.post('/pregnancy', createPregnancy);
router.put('/pregnancy/:id/anc', addANCVisit);
router.put('/pregnancy/:id/pnc', addPNCVisit);
router.put('/pregnancy/:id/delivery', updateDeliveryOutcome);

// Immunization routes
router.get('/immunizations', getImmunizations);
router.get('/immunization/:childId', getImmunizationByChild);
router.post('/immunization', createImmunization);
router.put('/immunization/:id/vaccine', updateVaccineStatus);
router.put('/immunization/:id/growth', addGrowthData);

export default router;
