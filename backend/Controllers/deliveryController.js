import DeliveryPersonnel from '../Models/deliveryModel.js';
import Patient from '../Models/patientModel.js';
import DietChart from '../Models/dietModel.js';
import User from '../Models/userModel.js';

export const createDeliveryPersonnel = async (req, res) => {
  try {
    const { name, email, contactInfo,location } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const newUser = new User({
      name,
      email,
      password: "Password@2025",
      role: 'Delivery Personnel',
    });
    await newUser.save();

    const newDeliveryPersonnel = new DeliveryPersonnel({
      staff: [{name,contactInfo,},],
      location,
      userId: newUser._id, 
    });
    await newDeliveryPersonnel.save();

    res.status(201).json({ 
      message: 'Delivery personnel created successfully', 
      deliveryPersonnel: newDeliveryPersonnel 
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating delivery personnel', error: error.message });
  }
};

export const assignDeliveryTask = async (req, res) => {
  try {
    const { description, personnelId, dietChartId, patientId, deliveryTimes } = req.body;
    req.body
    const deliveryPersonnel = await DeliveryPersonnel.findOne({"staff._id":personnelId});
    if (!deliveryPersonnel) {
      return res.status(404).json({ message: "Delivery personnel not found" });
    }

    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const dietChart = await DietChart.findById(dietChartId);
    if (!dietChart) {
      return res.status(404).json({ message: "Diet chart not found" });
    }

    const taskDeliveredTimes = {};
    if (deliveryTimes.morning) {
      taskDeliveredTimes.morning = {
        status: deliveryTimes.morning.status || "Pending",
        deliveredBy: deliveryTimes.morning.deliveredBy,
      };
    }
    if (deliveryTimes.evening) {
      taskDeliveredTimes.evening = {
        status: deliveryTimes.evening.status || "Pending",
        deliveredBy: deliveryTimes.evening.deliveredBy,
      };
    }
    if (deliveryTimes.night) {
      taskDeliveredTimes.night = {
        status: deliveryTimes.night.status || "Pending",
        deliveredBy: deliveryTimes.night.deliveredBy,
      };
    }

    const newTask = {
      description,
      dietChart: dietChartId,
      patient: patientId,
      deliveryTimes: taskDeliveredTimes,
      notes: req.body.notes || "",
    };

    deliveryPersonnel.deliveries.push(newTask);
    await deliveryPersonnel.save();

    res.status(201).json({
      message: 'Delivery task assigned successfully',
      deliveryTask: newTask,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error assigning delivery task', error: error.message });
  }
};


export const getDeliveryTasksForPersonnel = async (req, res) => {
  try {
    const { deliveryPersonnelId } = req.params;

    const deliveryPersonnel = await DeliveryPersonnel.findOne({ "userId": deliveryPersonnelId })
    if (!deliveryPersonnel) {
      return res.status(404).json({ message: 'No data found' });
    }
    const deliveriesData=deliveryPersonnel.deliveries;
    res.status(200).json({message:"data found successfully:",deliveriesData});
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving delivery tasks', error: error.message });
  }
};

export const updateDeliveryTaskStatus = async (req, res) => {
  const { deliveryId, updates } = req.body;
  try {
    const deliveryTask = await DeliveryPersonnel.findOne({ "deliveries._id": deliveryId });
    if (!deliveryTask) {
      return res.status(404).json({ message: 'Meal delivery not found' });
    }

    const task = deliveryTask.deliveries.id(deliveryId);
    if (!task) {
      return res.status(404).json({ message: 'Meal delivery not found in deliveries' });
    }
    for (const [time, status] of Object.entries(updates)) {
      if (task.deliveryTimes[time]) {
        task.deliveryTimes[time].status = status;
      }
    }

    await deliveryTask.save();
    res.status(200).json({ message: 'Delivery task status updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating delivery task status', error: error.message });
  }
};

export const getAllDeliveryPersonnel = async (req, res) => {
  try {
    const delivery = await DeliveryPersonnel.find()

    res.status(200).json(delivery);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving delivery personnel', error: error.message });
  }
};

export const updateDeliveryPersonnel = async (req, res) => {
  const { personnelId } = req.params;
  const updateData = req.body;

  try {
    const delivery = await Delivery.findOne({ "deliveryPersonnel._id": personnelId });
    if (!delivery) {
      return res.status(404).json({ message: 'Delivery personnel not found' });
    }

    const personnel = delivery.deliveryPersonnel.id(personnelId);
    if (!personnel) {
      return res.status(404).json({ message: 'Personnel not found in delivery personnel list' });
    }

    Object.assign(personnel, updateData);

    await delivery.save();
    res.status(200).json({ 
      message: 'Delivery personnel updated successfully', 
      personnel 
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating delivery personnel', error: error.message });
  }
};
