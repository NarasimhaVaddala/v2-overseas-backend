import { Router } from "express";
import {
  AddContent,
  AddUniversity,
  deleteUniversity,
  EditContent,
  getUniversities,
  getContent,
  deleteContent,
} from "../controllers/ContentController.js";
import upload from "../middlewares/multerconfig.js";

const router = Router();

router.post("/add-content/:page/:section", upload.single("image"), AddContent);
router.put("/edit-content/:id", upload.single("image"), EditContent);
router.get("/get-content/:page/:section", getContent);

router.delete("/delete-content/:id", deleteContent);

router.post("/add-university", upload.single("image"), AddUniversity);
router.delete("/delete-university/:id", deleteUniversity);
router.get("/get-universities", getUniversities);
export default router;
