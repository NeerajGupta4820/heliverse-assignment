import Pantry from '../Models/pantryModel.js';
import Patient from '../Models/patientModel.js';
import DietChart from '../Models/dietModel.js';
import User from '../Models/userModel.js';

export const createPantryStaff = async (req, res) => {
  try {
  const { name,email, contactInfo, location} = req.body;
  const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = new User({ name, email, password:"Password@2025", role: 'Pantry Staff' });
    await newUser.save();    

    const newPantryStaff = new Pantry({
      staff: [{name,contactInfo,},],
      location,
      userId: newUser._id, 
    });
    await newPantryStaff.save();

    res.status(201).json({ message: 'Pantry staff created successfully', pantryStaff: newPantryStaff });
  } catch (error) {
    res.status(500).json({ message: 'Error creating pantry staff' });
  }
};

export const getAllPantryStaff = async (req, res) => {
  try {
    const pantryStaff = await Pantry.find()
    .populate({
      path: 'preparationTasks.patient', 
      select: 'name', 
    })
    res.status(200).json(pantryStaff);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving pantry staff' });
  }
};

export const updatePantryStaff = async (req, res) => {
  const { pantryStaffId } = req.params;
  const updateData = req.body;

  try {
    const updatedPantryStaff = await Pantry.findByIdAndUpdate(
      pantryStaffId,
      updateData,
      { new: true }
    );
    if (!updatedPantryStaff) {
      return res.status(404).json({ message: "Pantry staff not found" });
    }

    res.status(200).json({
      message: "Pantry staff updated successfully",
      pantryStaff: updatedPantryStaff,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating pantry staff" });
  }
};

export const assignTask = async (req, res) => {
  try {
    const { tasktype, description, pantryStaffId, patientId, dietChartId, selectedTimes } = req.body;

    const pantry = await Pantry.findOne({ "staff._id": pantryStaffId });
    if (!pantry) {
      return res.status(404).json({ message: "Pantry staff not found" });
    }

    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const dietChart = await DietChart.findById(dietChartId);
    if (!dietChart) {
      return res.status(404).json({ message: "Diet chart not found" });
    }

    const taskSelectedTimes = {};
    if (selectedTimes.morning) {
      taskSelectedTimes.morning = {
        status: selectedTimes.morning.status || "Pending",
        preparedBy: selectedTimes.morning.preparedBy,
      };
    }
    if (selectedTimes.evening) {
      taskSelectedTimes.evening = {
        status: selectedTimes.evening.status || "Pending",
        preparedBy: selectedTimes.evening.preparedBy,
      };
    }
    if (selectedTimes.night) {
      taskSelectedTimes.night = {
        status: selectedTimes.night.status || "Pending",
        preparedBy: selectedTimes.night.preparedBy,
      };
    }

    const task = {
      tasktype,
      description,
      dietChart: dietChartId,
      patient: patientId,
      selectedTimes: taskSelectedTimes, 
      createdAt: new Date(),
    };

    pantry.preparationTasks.push(task);
    await pantry.save();

    res.status(200).json({ message: "Task assigned successfully", pantry });
  } catch (error) {
    res.status(500).json({ message: "Error assigning task", error: error.message });
  }
};


export const getPreparationTasksForStaff = async (req, res) => {
  try {
    const { pantryStaffId } = req.params; 

    const pantryStaff = await Pantry.findOne(
      { "userId": pantryStaffId },
      "preparationTasks"
    ).populate({
      path: "preparationTasks.patient",
      select: "name",
    });

    if (!pantryStaff || !pantryStaff.preparationTasks) {
      return res.status(404).json({ message: "No tasks found for this pantry staff" });
    }

    res.status(200).json({ tasks: pantryStaff.preparationTasks });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving preparation tasks", error: error.message });
  }
};

export const updateMealStatus = async (req, res) => {
  const { taskId, updates } = req.body; 

  try {
    const pantryTask = await Pantry.findOne({ "preparationTasks._id": taskId });
    if (!pantryTask) {
      return res.status(404).json({ success: false, message: 'Task not found.' });
    }
    const task = pantryTask.preparationTasks.id(taskId);
    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found in preparationTasks.' });
    }
    for (const [mealType, status] of Object.entries(updates)) {
      if (task.selectedTimes[mealType]) {
        task.selectedTimes[mealType].status = status;
      }
    }
    await pantryTask.save();

    return res.status(200).json({ success: true, message: 'Task statuses updated successfully.' });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
};

