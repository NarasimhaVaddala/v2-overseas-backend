import { TryCatch } from "../middlewares/error.js";
import ContentModal from "../models/ContentModal.js";
import UniversityModal from "../models/UniversityModal.js";

export const AddContent = TryCatch(async (req, res) => {
  const { page, section } = req.params;

  if (!page || !section) {
    return res.status(400).send({ message: "Page and section is required" });
  }

  const { title, description, extraPoints } = req.body;

  const image = req.file;

  const body = {};

  if (title) body.title = title;
  if (description) body.description = description;

  if (extraPoints) {
    if (Array.isArray(JSON.parse(extraPoints))) {
      console.log(typeof JSON.parse(extraPoints));

      body.extraPoints = JSON.parse(extraPoints);
    } else {
      return res.status(400).send({ message: "extraPoints must be an array" });
    }
  }

  if (image) body.image = image.path; // Assuming you're using Multer and want .path

  body.page = page;
  body.section = section;

  const newContent = await ContentModal.create(body); // Don't forget to pass body!

  res.status(201).send(newContent);
});

export const EditContent = TryCatch(async (req, res) => {
  const { id } = req.params;

  // Find the content by ID
  const content = await ContentModal.findById(id);
  if (!content) {
    return res.status(404).send({ message: "Content not found" });
  }

  const { title, description, extraPoints } = req.body;
  const image = req.file;

  // Prepare update object
  const updateData = {};

  if (title) updateData.title = title;
  if (description) updateData.description = description;

  console.log(extraPoints, "extraPoints");

  // Handle extraPoints: must be array of strings
  if (extraPoints) {
    if (Array.isArray(JSON.parse(extraPoints))) {
      console.log(typeof JSON.parse(extraPoints));

      updateData.extraPoints = JSON.parse(extraPoints);
    } else {
      return res.status(400).send({ message: "extraPoints must be an array" });
    }
  }

  // Handle image upload
  if (image) {
    updateData.image = image.path; // or image.filename, depending on your storage
  }

  // Only update page if explicitly provided (usually not needed)
  if (req.body.page) {
    updateData.page = req.body.page;
  }

  // Perform update
  const updatedContent = await ContentModal.findByIdAndUpdate(id, updateData, {
    new: true, // Return updated document
    runValidators: true, // Ensure schema validation runs
  });

  res.status(200).send(updatedContent);
});

export const AddUniversity = TryCatch(async (req, res) => {
  const { title } = req.body;

  const image = req.file?.path;

  if (!title || !image) {
    return res.status(400).send({ message: "Image and title are required" });
  }

  const newUniversity = await UniversityModal.create({ title, image });

  return res.status(200).send(newUniversity);
});

export const deleteUniversity = TryCatch(async (req, res) => {
  const { id } = req.params;

  const deleteUniversity = await UniversityModal.findByIdAndDelete(id);

  if (!deleteUniversity) {
    return res.status(404).send({ message: "University Not Found" });
  }

  return res.status(200).send(deleteUniversity);
});

export const getUniversities = TryCatch(async (req, res) => {
  const universities = await UniversityModal.find({});
  return res.status(200).send(universities);
});
export const getContent = TryCatch(async (req, res) => {
  const { page, section } = req.params;

  if (section === "visatypes" || section === "terms" || section === "privacy") {
    const content = await ContentModal.find({ page, section });
    return res.status(200).send(content);
  }

  const content = await ContentModal.findOne({ page, section });
  return res.status(200).send(content);
});

export const deleteContent = TryCatch(async (req, res) => {
  const { id } = req.params;
  const content = await ContentModal.findByIdAndDelete(id);
  return res.status(200).send(content);
});
