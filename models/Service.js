import { model, Model, Schema } from "mongoose";

const schema = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },

  extraPoints: {
    type: [String],
  },

  image: {
    type: String,
  },
});

const ServiceModal = model("Service", schema);
export default ServiceModal;
