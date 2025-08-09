import { model, Model, Schema } from "mongoose";

const schema = new Schema(
  {
    page: {
      type: String,
      default: "home",
    },

    title: {
      type: String,
      required: true,
    },

    subTitle: {
      type: String,
      required: true,
    },

    extraPoint: {
      type: String,
    },

    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const HeroSectionModal = model("hero", schema);

export default HeroSectionModal;
