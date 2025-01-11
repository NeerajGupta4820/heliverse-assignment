import mongoose from "mongoose"
import DietChart from "../Models/dietModel.js";
import Patient from "../Models/patientModel.js";
import Pantry from "../Models/patientModel.js";
import User from "../Models/userModel.js";
import jwt from 'jsonwebtoken';

export const createDietChart = async (req, res) => {
  try {
    const { patientId, meals, createdBy } = req.body;

    const decodedToken = jwt.verify(createdBy, process.env.JWT_SECRET);
    const userId = decodedToken.userId;

    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ success: false, message: "Patient not found" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "Creator not found" });
    }

    const newDietChart = new DietChart({
      patient: patientId,
      meals,
      createdBy: userId, 
    });

    await newDietChart.save();

    return res.status(201).json({ success: true, message: "Diet chart created", data: newDietChart });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


export const getAllDietCharts = async (req, res) => {
  try {
    const dietCharts = await DietChart.find()
      .populate("patient", "name _id roomNumber bedNumber")
      .populate("createdBy", "name")
      
    return res.status(200).json({ success: true, data: dietCharts });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateMealStatus = async (req, res) => {
  try {
    const { dietChartId, mealType, status } = req.body;

    const dietChart = await DietChart.findById(dietChartId);
    if (!dietChart) {
      return res.status(404).json({ success: false, message: "Diet chart not found" });
    }

    if (!["morning", "evening", "night"].includes(mealType)) {
      return res.status(400).json({ success: false, message: "Invalid meal type" });
    }

    dietChart.meals[mealType].status = status;
    await dietChart.save();

    return res.status(200).json({ success: true, message: "Meal status updated", data: dietChart });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateDeliveryStatus = async (req, res) => {
  try {
    const { dietChartId, mealType, deliveryStatus } = req.body;

    const dietChart = await DietChart.findById(dietChartId);
    if (!dietChart) {
      return res.status(404).json({ success: false, message: "Diet chart not found" });
    }

    if (!["morning", "evening", "night"].includes(mealType)) {
      return res.status(400).json({ success: false, message: "Invalid meal type" });
    }

    dietChart.meals[mealType].deliveryStatus = deliveryStatus;
    await dietChart.save();

    return res.status(200).json({ success: true, message: "Delivery status updated", data: dietChart });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const assignDietChart = async (req, res) => {
  try {
    const { dietChartId, assignedTo } = req.body;

    const dietChart = await DietChart.findById(dietChartId);
    if (!dietChart) {
      return res.status(404).json({ success: false, message: "Diet chart not found" });
    }

    const pantry = await Pantry.findById(assignedTo);
    if (!pantry) {
      return res.status(404).json({ success: false, message: "Pantry staff not found" });
    }

    dietChart.assignedTo = assignedTo;
    await dietChart.save();

    return res.status(200).json({ success: true, message: "Diet chart assigned", data: dietChart });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
