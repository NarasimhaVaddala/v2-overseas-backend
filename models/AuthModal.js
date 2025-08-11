import { model, Model, Schema } from "mongoose";

const schema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },

  password: {
    type: String,
  },
});

const UserModal = model("User", schema);
export default UserModal;
