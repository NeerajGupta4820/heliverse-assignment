import mongoose from "mongoose";

const deliverySchema = new mongoose.Schema(
  {
    staff: [
      {
        name: { type: String, required: true },
        contactInfo: { type: String, required: true },
        status: {
          type: String,
          enum: ["Available", "Busy", "Off Duty"],
          default: "Available",
        },
      },
    ],
    location: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    deliveries: [
      {
        description: {
          type: String,
          required: true,
        },
        dietChart: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "DietChart",
          required: true,
        },
        patient: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Patient",
          required: true,
        },
        deliveryTimes: {
          morning: {
            status: {
              type: String,
              enum: ["Pending", "In Progress", "Delivered"],
            },
            deliveredBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
          },
          evening: {
            status: {
              type: String,
              enum: ["Pending", "In Progress", "Delivered"],
            },
            deliveredBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
          },
          night: {
            status: {
              type: String,
              enum: ["Pending", "In Progress", "Delivered"],
            },
            deliveredBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
          },
        },
        notes: {
          type: String,
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

export default mongoose.model("DeliveryPersonnel", deliverySchema);
