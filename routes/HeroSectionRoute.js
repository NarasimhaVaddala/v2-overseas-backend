import { Router } from "express";
import {
  AddHero,
  EditHero,
  getHero,
} from "../controllers/HeroSectionController.js";
import upload from "../middlewares/multerconfig.js";

const router = Router();

router.post("/add/:page", upload.single("image"), AddHero);
router.put("/edit/:id", upload.single("image"), EditHero);
router.get("/get/:page", getHero);

export default router;
