import mongoose from 'mongoose';
const { Schema } = mongoose;

const patientSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    diseases: {
      type: [String], 
      required: true,
    },
    allergies: {
      type: [String], 
      required: true,
    },
    roomNumber: {
      type: String,
      required: true,
    },
    bedNumber: {
      type: String,
      required: true,
    },
    floorNumber: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'], 
      required: true,
    },
    contactInfo: {
      type: String,
      required: true,
    },
    emergencyContact: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, 
  }
);

export default mongoose.model('Patient', patientSchema);
