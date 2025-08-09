import { TryCatch } from "../middlewares/error.js";
import CardModal from "../models/CardModal.js";

export const AddCard = TryCatch(async (req, res) => {
  const { page, section } = req.params;

  const { title, description } = req.body;

  const image = req.file?.path;

  if (!page || !section) {
    return res.status(400).send({ message: "Page  and Section are requireds" });
  }
  if (!title || !description) {
    return res
      .status(400)
      .send({ message: "Title and Description are required" });
  }

  const body = { title, description, page, section };
  if (image) body.image = req.file?.path;

  const newCard = await CardModal.create(body);
  return res.status(200).send(newCard);
});

export const EditCard = TryCatch(async (req, res) => {
  const { id } = req.params;

  const { title, description } = req.body;

  const image = req.file?.path;

  const body = {};
  if (title) body.title = title;
  if (description) body.description = description;
  if (image) body.image = req.file?.path;

  const newCard = await CardModal.findByIdAndUpdate(id, {
    $set: body,
  });
  return res.status(200).send(newCard);
});

export const DeleteCard = TryCatch(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({ message: "Id are required" });
  }

  const deletedCard = await CardModal.findByIdAndDelete(id);
  return res.status(200).send(deletedCard);
});

export const getCards = TryCatch(async (req, res) => {
  const { page, section } = req.params;

  if (!page || !section) {
    return res.status(400).send({ message: "Page  and Section are requireds" });
  }

  const newCard = await CardModal.find({ page, section });
  return res.status(200).send(newCard);
});
