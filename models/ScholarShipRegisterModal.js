import { Schema, model } from "mongoose";

const ScholarshipSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    universities: {
      type: [String],
      default: [],
    },
    country: {
      type: String,
      required: true,
    },
    expireDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const ScholarshipModal = model("Scholarship", ScholarshipSchema);
export default ScholarshipModal;
