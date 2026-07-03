import mongoose from "mongoose";

const meetingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    startTime: {
      type: Number,
      required: true,
      min: 0,
      max: 1440,
    },

    endTime: {
      type: Number,
      required: true,
      min: 0,
      max: 1440,
    },

    date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const meeting = mongoose.model("Meeting", meetingSchema);

export default meeting;