import express from 'express';
import { createPatient, getAllPatients, updatePatient, deletePatient } from '../Controllers/patientController.js';
import { authenticate, authorize } from '../middlewares/authMiddleware.js'; 

const router = express.Router();

router.post('/create', authenticate, authorize(['Hospital Manager']), createPatient);
router.get('/all-patients', authenticate,authorize(['Hospital Manager','Pantry Staff']), getAllPatients);
router.put('/update/:patientId', authenticate, authorize(['Hospital Manager']), updatePatient);
router.delete('/delete/:patientId', authenticate, authorize(['Hospital Manager']), deletePatient);

export default router;
