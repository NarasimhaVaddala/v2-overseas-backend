import express from "express";
import fs from "fs";
import upload from "../middlewares/multerconfig.js";
import ApplyScholarShip from "../models/ScholarShipApply.Modal.js";
import ScholarShipDisModal from "../models/DisScholarShip.modal.js";

const router = express.Router();

router.post(
  "/",
  upload.fields([
    { name: "transcript", maxCount: 1 },
    { name: "passport", maxCount: 1 },
    { name: "englishProof", maxCount: 1 },
    { name: "statement", maxCount: 1 },
    { name: "scores", maxCount: 1 },
    { name: "recommendation", maxCount: 1 },
    { name: "certificates", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { fullName, mobile, email, university, graduation, course } =
        req.body;

      const documents = {};
      for (let field in req.files) {
        documents[field] = req.files[field][0].path; // save file path
      }

      const scholarship = new ApplyScholarShip({
        fullName,
        mobile,
        email,
        university,
        graduation,
        course,
        documents,
      });

      await scholarship.save();
      res.status(201).json({ success: true, data: scholarship });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }
);

// GET all scholarships
router.get("/", async (req, res) => {
  const { search, startDate, endDate } = req.query;

  const filter = {};
  if (search) {
    filter.$or = [
      { fullName: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { mobile: { $regex: search, $options: "i" } },
    ];
  }

  if (startDate || endDate) {
    filter.createdAt = {};
    if (startDate) {
      filter.createdAt.$gte = new Date(startDate);
    }
    if (endDate) {
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      filter.createdAt.$lte = end;
    }
  }

  try {
    const scholarships = await ApplyScholarShip.find(filter).sort({
      createdAt: -1,
    });

    return res.json(scholarships);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE one scholarship (and remove files)
router.delete("/:id", async (req, res) => {
  try {
    const scholarship = await ApplyScholarShip.findById(req.params.id);
    if (!scholarship) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    // delete associated files
    Object.values(scholarship.documents).forEach((filePath) => {
      if (filePath && fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    });

    await ApplyScholarShip.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Scholarship deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.get("/toggle", async (req, res) => {
  try {
    let doc = await ScholarShipDisModal.findOne();
    // console.log("doc", doc);

    return res.status(200).json({ isDisplay: doc.isDisplay });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

router.put("/toggle", async (req, res) => {
  try {
    // find the document (assuming only one)
    let doc = await ScholarShipDisModal.findOne();

    if (!doc) {
      doc = new ScholarShipDisModal();
    }
    doc.isDisplay = !doc.isDisplay;

    // save updated doc
    await doc.save();

    res.json({
      success: true,
      isDisplay: doc.isDisplay,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

export default router;
