import { Router } from "express";

import {
  AddAddress,
  AddEditocialOrContact,
  DeleteAddress,
  EditAddress,
  GetSocialOrContact,
  getAddress,
  getAllPeopleContacted,
} from "../controllers/ContactController.js";

const router = Router();

router.post("/edit-social", AddEditocialOrContact);
router.get("/social", GetSocialOrContact);

router.get("/get-address", getAddress);
router.post("/add-address", AddAddress);
router.put("/edit-address/:id", EditAddress);
router.delete("/delete-address/:id", DeleteAddress);

router.get("/admin-contacts", getAllPeopleContacted);

export default router;
