import Patient from '../Models/patientModel.js';

export const createPatient = async (req, res) => {
  const { name, diseases, allergies, roomNumber, bedNumber, floorNumber, age, gender, contactInfo, emergencyContact } = req.body;

  try {
    const newPatient = new Patient({ name, diseases, allergies, roomNumber, bedNumber, floorNumber, age, gender, contactInfo, emergencyContact });
    await newPatient.save();

    res.status(201).json({ message: 'Patient created successfully', patient: newPatient });
  } catch (error) {
    res.status(500).json({ message: 'Error creating patient' });
  }
};

export const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving patients' });
  }
};

export const updatePatient = async (req, res) => {
  const { patientId } = req.params;
  const updateData = req.body;

  try {
    const updatedPatient = await Patient.findByIdAndUpdate(patientId, updateData, { new: true });
    if (!updatedPatient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    res.status(200).json({ message: 'Patient updated successfully', patient: updatedPatient });
  } catch (error) {
    res.status(500).json({ message: 'Error updating patient' });
  }
};

export const deletePatient = async (req, res) => {
  const { patientId } = req.params;

  try {
    const deletedPatient = await Patient.findByIdAndDelete(patientId);
    if (!deletedPatient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    res.status(200).json({ message: 'Patient deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting patient' });
  }
};
