import { Schema, model } from "mongoose";

const schema = new Schema({
  title: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: true,
  },
});

const UniversityModal = model("university", schema);
export default UniversityModal;
