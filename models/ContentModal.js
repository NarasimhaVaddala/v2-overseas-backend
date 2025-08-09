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

  page: {
    type: String,
    required: true,
  },

  section: {
    type: String,
    required: true,
  },
});

const ContentModal = model("content", schema);
export default ContentModal;
