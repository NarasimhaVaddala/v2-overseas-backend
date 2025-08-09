import { Router } from "express";
import {
  contactDetails,
  GetAllAboutPage,
  GetAllHomePage,
  GetAllServicesPage,
  GetAllVisaPage,
  getUniversities,
  postContact,
} from "../controllers/WebsiteController.js";

const router = Router();

router.get("/home", GetAllHomePage);
router.get("/about", GetAllAboutPage);
router.get("/services", GetAllServicesPage);
router.get("/visa", GetAllVisaPage);
router.get("/contact", contactDetails);
router.get("/universities", getUniversities);

router.post("/contact", postContact);

export default router;
