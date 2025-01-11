import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import routes from './app.js'; 
import connectDB from './config/db.js';
import cors from "cors"
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

// Default route for health check
app.get('/', (req, res) => {
  res.send('Backend is running! 🚀');
});

app.use('/api', routes);

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
