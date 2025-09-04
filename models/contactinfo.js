import { Schema, model } from "mongoose";

const schema = new Schema({
  facebook: { type: String, default: null },
  instagram: { type: String, default: null },
  youtube: { type: String, default: null },
  twitter: { type: String, default: null },

  // ✅ Split into code + number
  whatsappCode: { type: String, default: "+91" },
  whatsapp: { type: String, default: null },

  mobileCode: { type: String, default: "+91" },
  mobile: { type: String, default: null },

  landlineCode: { type: String, default: "+91" },
  landline: { type: String, default: null },

  email: { type: String, default: null },
});

const contactinfo = model("contactinfo", schema);
export default contactinfo;
