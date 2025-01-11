import mongoose from 'mongoose';

const pantrySchema = new mongoose.Schema(
  {
    staff: [
      {
        name: { type: String, required: true },
        contactInfo: { type: String, required: true },
        status: {
          type: String,
          enum: ['Available', 'Busy', 'Off Duty'],
          default: 'Available',
        },
      },
    ],
    location: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    preparationTasks: [
      {
        tasktype:{
          type:String,
          required:true,
        },
        description:{
          type:String,
          required:true,
        },
        dietChart: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'DietChart',
          required: true,
        },
        patient: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Patient',
          required: true,
        },
        selectedTimes: {
          morning: {
            status: {
              type: String,
              enum: ['Pending', 'In Progress', 'Completed'],
            },
            preparedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
          },
          evening: {
            status: {
              type: String,
              enum: ['Pending', 'In Progress', 'Completed'],
            },
            preparedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
          },
          night: {
            status: {
              type: String,
              enum: ['Pending', 'In Progress', 'Completed'],
            },
            preparedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
          },
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model('Pantry', pantrySchema);
