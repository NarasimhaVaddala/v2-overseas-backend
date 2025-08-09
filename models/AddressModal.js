import { Schema, model } from "mongoose";

const schema = new Schema({
  title: {
    type: String,
    required: true,
  },

  address: {
    type: String,
    required: true,
  },

  pincode: {
    type: String,
  },
});

const AddressModal = model("address", schema);

export default AddressModal;
