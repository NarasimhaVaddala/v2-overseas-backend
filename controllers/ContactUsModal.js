import { model, Schema } from "mongoose";

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    study: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ContactUsModal = model("contact", schema);

export default ContactUsModal;
