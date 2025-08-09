import { TryCatch } from "../middlewares/error.js";
import AddressModal from "../models/AddressModal.js";
import CardModal from "../models/CardModal.js";
import contactinfo from "../models/contactinfo.js";
import ContentModal from "../models/ContentModal.js";
import HeroSectionModal from "../models/HeroSectionModal.js";
import UniversityModal from "../models/UniversityModal.js";
import ContactUsModal from "./ContactUsModal.js";

export const GetAllHomePage = TryCatch(async (req, res) => {
  // 1. Fetch Hero Section (only one document)
  const heroData = await HeroSectionModal.findOne({ page: "home" });

  // 2. Fetch all ContentModal data in a single query using $in
  const contentQueries = [
    { page: "home", section: "second" },
    { page: "home", section: "online-councelling" },
    { page: "home", section: "aboutus" },
  ];

  const contentResults = await ContentModal.find({
    $or: contentQueries,
  }).lean();

  // Index content by section for fast lookup
  const contentMap = {};
  contentResults.forEach((doc) => {
    contentMap[doc.section] = doc;
  });

  // 3. Fetch all CardModal data in a single query
  const cardResults = await CardModal.find({
    page: "home",
    section: { $in: ["study", "latest-update", "testimonials"] },
  }).lean();

  // Index cards by section
  const cardMap = {};
  cardMap["study"] = cardResults.filter((c) => c.section === "study");
  cardMap["latest-update"] = cardResults.find(
    (c) => c.section === "latest-update"
  );
  cardMap["testimonials"] = cardResults.find(
    (c) => c.section === "testimonials"
  );

  const universities = await UniversityModal.find({});

  // Construct response in required order
  const sections = {
    hero: heroData,
    second: contentMap["second"],
    cards: cardMap["study"],
    onlineCouncelling: contentMap["online-councelling"],
    latestUpdates: cardMap["latest-update"],
    aboutUs: contentMap["aboutus"],
    testimonials: cardMap["testimonials"],
    universities,
  };

  return res.status(200).send(sections);
});

export const GetAllAboutPage = TryCatch(async (req, res) => {
  const hero = await HeroSectionModal.findOne({ page: "about" });

  const second = await ContentModal.findOne({
    page: "about",
    section: "second",
  });

  const team = await CardModal.find({
    page: "about",
    section: "meet-our-teem",
  });

  const section = {
    hero,
    second,
    team,
  };

  return res.status(200).send(section);
});

export const GetAllServicesPage = TryCatch(async (req, res) => {
  // Fetch hero and second section (can't combine with others due to different structure)
  const hero = await HeroSectionModal.findOne({ page: "services" });
  const second = await ContentModal.findOne({
    page: "services",
    section: "ourservice",
  });

  // Prepare section names for service points
  const serviceSections = [
    "service-point-1",
    "service-point-2",
    "service-point-3",
    "service-point-4",
    "service-point-5",
    "service-point-6",
  ];

  // Fetch all 6 service points in a SINGLE query
  const serviceDocs = await ContentModal.find({
    page: "services",
    section: { $in: serviceSections },
  }).sort({ section: 1 }); // Sort to ensure correct order (if needed)

  // Optional: Ensure order by manually mapping (since $in doesn't guarantee order)
  const serviceInfos = serviceSections.map(
    (sectionName) =>
      serviceDocs.find((doc) => doc.section === sectionName) || null
  );

  // Now you have hero, second, and serviceInfos
  const result = {
    hero,
    second,
    serviceInfos,
  };

  return res.status(200).send(result);
});

export const GetAllVisaPage = TryCatch(async (req, res) => {
  // 1. Fetch hero section (different model, can't batch)
  const hero = await HeroSectionModal.findOne({ page: "visa" });

  // 2. Batch fetch all ContentModal sections in ONE query
  const sectionsNeeded = ["second", "third", "visatypes"];

  const contentDocs = await ContentModal.find({
    page: "visa",
    section: { $in: sectionsNeeded },
  }).lean(); // .lean() for better performance

  // Create a map for easy access
  const contentMap = {};
  contentDocs.forEach((doc) => {
    contentMap[doc.section] = doc;
  });

  // Fill in case any section is missing
  const second = contentMap["second"] || null;
  const visaProcess = contentMap["third"] || null;
  const visaTypeArray = contentMap["visatypes"] || null;

  // Prepare response
  const result = {
    hero,
    second,
    visaProcess,
    visaTypeArray,
  };

  return res.status(200).send(result);
});

export const contactDetails = TryCatch(async (req, res) => {
  const contact = await contactinfo.findOne({});
  const addresses = await AddressModal.find({});

  return res.status(200).send({ contact, addresses });
});

export const getUniversities = TryCatch(async (req, res) => {
  const universities = await UniversityModal.find({});
  return res.status(200).send(universities);
});

export const postContact = TryCatch(async (req, res) => {
  const { name, email, mobile, study } = req.body;

  if (!name || !email || !mobile || !study) {
    return res.status(400).send({ message: "Please Fill required Fields" });
  }

  const newContact = await ContactUsModal.create({
    name,
    email,
    mobile,
    study,
  });

  return res.status(200).send({ message: "Thankyou for contacting us" });
});
