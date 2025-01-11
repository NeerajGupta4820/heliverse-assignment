import express from 'express';
import { 
  createDietChart, 
  getAllDietCharts, 
  updateMealStatus, 
  updateDeliveryStatus, 
  assignDietChart 
} from '../Controllers/dietController.js';
import { authenticate, authorize } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/create', authenticate, authorize(['Hospital Manager']), createDietChart);
router.get('/dietCharts', authenticate, authorize(['Hospital Manager', 'Pantry Staff']), getAllDietCharts);
router.put('/update-meal-status', authenticate, authorize(['Hospital Manager', 'Pantry Staff']), updateMealStatus);
router.put('/update-delivery-status', authenticate, authorize(['Pantry Staff', 'Delivery Personnel']), updateDeliveryStatus);
router.put('/assign', authenticate, authorize(['Hospital Manager']), assignDietChart);

export default router;
