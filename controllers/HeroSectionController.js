import { TryCatch } from "../middlewares/error.js";
import HeroSectionModal from "../models/HeroSectionModal.js";
import fs from "fs";

export const AddHero = TryCatch(async (req, res) => {
  const image = req.file?.path;

  const { title, subTitle, extraPoint } = req.body;

  const { page } = req.params;

  const alreadyExists = await HeroSectionModal.findOne({ page: page });

  if (alreadyExists) {
    return res
      .status(400)
      .send({ message: "This section already exists, please update" });
  }

  if (!image || !title || !subTitle) {
    return res.status(400).send({ message: "Please fill required fields" });
  }

  const body = {
    title,
    subTitle,
    extraPoint,
    image,
    page,
  };

  if (extraPoint) body.extraPoint = extraPoint;

  const newDoc = await HeroSectionModal.create(body);

  return res.status(200).send(newDoc);
});

export const EditHero = TryCatch(async (req, res) => {
  console.log(req.file);

  const { title, subTitle, extraPoint } = req.body;
  const { id } = req.params;

  // Find the document
  const updated = await HeroSectionModal.findById(id);
  if (!updated) {
    return res.status(404).send({ message: "Section Not Found" });
  }

  // Update fields
  if (title) updated.title = title;
  if (subTitle) updated.subTitle = subTitle;
  if (extraPoint) updated.extraPoint = extraPoint;

  // Handle file update
  if (req.file) {
    const oldFile = updated.image;
    const newImagePath = req.file.path;

    // Delete old file if exists
    if (oldFile && fs.existsSync(oldFile)) {
      try {
        fs.unlinkSync(oldFile);
        console.log(`✅ Deleted old file: ${oldFile}`);
      } catch (err) {
        console.warn(`⚠️ Failed to delete old file: ${oldFile}`, err);
      }
    }

    // Update image path
    updated.image = newImagePath;
  }

  // 🔁 Save the updated document back to DB
  await updated.save();

  // ✅ Send updated document in response
  return res.status(200).json({
    message: "Hero section updated successfully",
    data: updated,
  });
});
export const getHero = TryCatch(async (req, res) => {
  const { page } = req.params;

  const heroSection = await HeroSectionModal.findOne({ page });

  return res.status(200).send(heroSection);
});
