import { Schema, model } from "mongoose";

const schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    // required: true,
  },

  page: {
    type: String,
    required: true,
  },

  section: {
    type: String,
    required: true,
  },
});

const CardModal = model("card", schema);

export default CardModal;
