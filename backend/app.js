import express from 'express';
import authRoutes from './Routes/userRoutes';
import patientRoutes from './Routes/patientRoutes.js';
import dietRoutes from './Routes/dietRoutes.js';
import pantryRoutes from './Routes/pantryRoutes.js';
import deliveryRoutes from './Routes/deliveryRoutes.js';
import cors from "cors"

const router = express.Router();
router.use(cors());

router.use('/auth', authRoutes);
router.use('/patients', patientRoutes);
router.use('/diets', dietRoutes);
router.use('/pantry', pantryRoutes);
router.use('/delivery', deliveryRoutes);

export default router;
