import { Router } from "express";
import {
  contactDetails,
  GetAllAboutPage,
  GetAllHomePage,
  GetAllServicesPage,
  GetAllVisaPage,
  getUniversities,
  postContact,
  getTerms,
  getprivacyPolicy,
  scholarShip,
} from "../controllers/WebsiteController.js";

const router = Router();

router.get("/home", GetAllHomePage);
router.get("/about", GetAllAboutPage);
router.get("/services", GetAllServicesPage);
router.get("/visa", GetAllVisaPage);
router.get("/contact", contactDetails);
router.get("/universities", getUniversities);
router.get("/terms", getTerms);
router.get("/privacy", getprivacyPolicy);

router.post("/contact", postContact);
// scholar ship
router.get("/scholar-ship", scholarShip);

export default router;
