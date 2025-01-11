import express from 'express';
import { 
  createDeliveryPersonnel, 
  assignDeliveryTask, 
  getDeliveryTasksForPersonnel, 
  updateDeliveryTaskStatus, 
  getAllDeliveryPersonnel, 
  updateDeliveryPersonnel 
} from '../Controllers/deliveryController.js';
import { authenticate, authorize } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/create-personnel', authenticate, authorize(['Pantry Staff']), createDeliveryPersonnel);
router.get('/all-personnel', authenticate, authorize(['Hospital Manager','Pantry Staff']), getAllDeliveryPersonnel);
router.put('/update-personnel/:personnelId', authenticate, authorize(['Pantry Staff']), updateDeliveryPersonnel);
router.post('/assign-task', authenticate, authorize(['Pantry Staff']), assignDeliveryTask);
router.get('/track-deliveries/:deliveryPersonnelId', authenticate, authorize(['Delivery Personnel','Pantry Staff']), getDeliveryTasksForPersonnel);
router.post('/update-deliveryStatus', authenticate, authorize(['Delivery Personnel']), updateDeliveryTaskStatus);

export default router;
