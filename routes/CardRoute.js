import { Router } from "express";
import upload from "../middlewares/multerconfig.js";
import {
  AddCard,
  DeleteCard,
  EditCard,
  getCards,
} from "../controllers/CardController.js";

const router = Router();

router.post("/add-card/:page/:section", upload.single("image"), AddCard);
router.put("/edit-card/:id", upload.single("image"), EditCard);
router.delete("/delete-card/:id", DeleteCard);

router.get("/get/:page/:section", getCards);

export default router;
