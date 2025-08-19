import { Router } from "express";
import ScholarshipModal from "../models/ScholarShipRegisterModal.js";
const router = Router();

router.post("/", async (req, res) => {
  try {
    const scholarship = new ScholarshipModal(req.body);
    await scholarship.save();
    res.status(201).json(scholarship);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // normalize time (ignore hours)

  const { status } = req.query || {};

  let filter = {};

  if (status === "active") {
    filter.expireDate = { $gte: today }; // today + future
  }

  try {
    const scholarships = await ScholarshipModal.find(filter).sort({
      createdAt: -1,
    });
    res.status(200).json(scholarships);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching scholarships", error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const scholarship = await ScholarshipModal.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!scholarship) {
      return res.status(404).json({ message: "Scholarship not found" });
    }

    res.json(scholarship);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const scholarship = await ScholarshipModal.findByIdAndDelete(req.params.id);

    if (!scholarship) {
      return res.status(404).json({ message: "Scholarship not found" });
    }

    res.json({ message: "Scholarship deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
