import { Schema, model } from "mongoose";

const schema = new Schema({
  facebook: {
    type: String,
    default: null,
  },
  instagram: {
    type: String,
    default: null,
  },

  youtube: {
    type: String,
    default: null,
  },
  twitter: {
    type: String,
    default: null,
  },
  whatsapp: {
    type: String,
    default: null,
  },

  mobile: {
    type: String,
    default: null,
  },
  landline: {
    type: String,
    default: null,
  },

  email: {
    type: String,
    default: null,
  },
});

const contactinfo = model("contactinfo", schema);
export default contactinfo;
