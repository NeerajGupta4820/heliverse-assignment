import express from 'express';
import { assignTask, createPantryStaff, getAllPantryStaff,updateMealStatus, getPreparationTasksForStaff, updatePantryStaff } from '../Controllers/pantryController.js';
import { authenticate, authorize } from '../middlewares/authMiddleware.js'; 

const router = express.Router();

router.post('/create', authenticate, authorize(['Hospital Manager']), createPantryStaff); 
router.get('/all', authenticate,authorize(['Hospital Manager']), getAllPantryStaff);
router.put('/update/:pantryStaffId', authenticate, authorize(['Hospital Manager']), updatePantryStaff); 
router.post('/assign-task',authenticate, authorize(['Hospital Manager']),assignTask);
router.get('/tasks/:pantryStaffId', authenticate, authorize(['Pantry Staff']), getPreparationTasksForStaff);
router.post('/update-mealStatus', authenticate, authorize(['Pantry Staff']), updateMealStatus);

export default router;
