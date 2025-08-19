import express from "express";
import upload from "../middlewares/multerconfig.js";
import CompanyDetails from "../models/companydetails.modal.js";
const router = express.Router();

router.post("/", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }

    const image = req.file?.path;
    let company = await CompanyDetails.findOne();

    if (!company) {
      company = new CompanyDetails({ logo: image });
    } else {
      company.logo = image;
    }
    await company.save();
    res.status(200).json({ message: "Logo updated successfully", company });
  } catch (error) {
    console.log("error", error);

    res.status(500).json({ success: false, message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const company = await CompanyDetails.findOne();

    if (!company || !company.logo) {
      return res.status(404).json({
        success: false,
        message: "No logo found",
      });
    }

    res.status(200).json({
      success: true,
      logo: company.logo,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
