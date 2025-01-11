import express from 'express';
import authRoutes from './routes/authRoutes';
import patientRoutes from './routes/patientRoutes.js';
import dietRoutes from './routes/dietRoutes.js';
import pantryRoutes from './routes/pantryRoutes.js';
import deliveryRoutes from './routes/deliveryRoutes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/patients', patientRoutes);
router.use('/diets', dietRoutes);
router.use('/pantry', pantryRoutes);
router.use('/delivery', deliveryRoutes);

export default router;
