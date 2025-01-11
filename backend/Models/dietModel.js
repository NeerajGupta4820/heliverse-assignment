import mongoose from 'mongoose';

const { Schema } = mongoose;

const mealSchema = new Schema({
  ingredients: { type: [String], required: true },
  instructions: { type: String, default: '' },
});

const dietChartSchema = new Schema(
  {
    patient: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
    meals: {
      morning: mealSchema,
      evening: mealSchema,
      night: mealSchema,
    },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

export default mongoose.model('DietChart', dietChartSchema);
