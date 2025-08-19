import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
  isDisplay: {
    type: Boolean,
    default: false,
  },
});

const ScholarShipDisModal = mongoose.model(
  "ScholarShipDisplay",
  documentSchema
);
export default ScholarShipDisModal;
