import { TryCatch } from "../middlewares/error.js";
import AddressModal from "../models/AddressModal.js";
import contactinfo from "../models/contactinfo.js";
import ContactUsModal from "./ContactUsModal.js";

export const AddEditocialOrContact = TryCatch(async (req, res) => {
  const {
    facebook,
    instagram,
    youtube,
    twitter,
    whatsapp,
    email,
    mobile,
    landline,
    mobileCode,
    whatsappCode,
    landlineCode,
  } = req.body;

  const updates = {};

  if (facebook) updates.facebook = facebook;
  if (instagram) updates.instagram = instagram;
  if (youtube) updates.youtube = youtube;
  if (twitter) updates.twitter = twitter;
  if (whatsapp) updates.whatsapp = whatsapp;
  if (email) updates.email = email;
  if (mobile) updates.mobile = mobile;
  if (landline) updates.landline = landline;

  if (mobileCode) updates.mobileCode = mobileCode;
  if (whatsappCode) updates.whatsappCode = whatsappCode;
  if (landlineCode) updates.landlineCode = landlineCode;

  const ContactInfo = await contactinfo.findOneAndUpdate(
    {},
    {
      $set: updates,
    }
  );

  if (!ContactInfo) {
    const newContact = await contactinfo.create(updates);
    return res.status(200).send(newContact);
  }

  return res.status(200).send(ContactInfo);
});

export const AddAddress = TryCatch(async (req, res) => {
  const { title, address, pincode } = req.body;

  if (!title || !address) {
    return res.status(400).send({ message: "Title and Address are required" });
  }

  const body = { title, address };
  if (pincode) body.pincode = pincode;

  const newAddress = await AddressModal.create(body);

  return res.status(200).send(newAddress);
});

export const EditAddress = TryCatch(async (req, res) => {
  const { title, address, pincode } = req.body;

  const { id } = req.params;

  const updates = {};
  if (title) updates.title = title;
  if (address) updates.address = address;
  if (pincode) updates.pincode = pincode;

  const updated = await AddressModal.findByIdAndUpdate(id, {
    $set: updates,
  });

  if (!updated) {
    return res.status(404).send({ message: "Address Not Found" });
  }

  return res.status(200).send(updated);
});

export const DeleteAddress = TryCatch(async (req, res) => {
  const { id } = req.params;

  const updated = await AddressModal.findByIdAndDelete(id);

  if (!updated) {
    return res.status(404).send({ message: "Address Not Found" });
  }

  return res.status(200).send(updated);
});

export const GetSocialOrContact = TryCatch(async (req, res) => {
  const contactData = await contactinfo.findOne({});

  return res.status(200).send(contactData);
});
export const getAddress = TryCatch(async (req, res) => {
  const addr = await AddressModal.find({});

  return res.status(200).send(addr);
});

// export const getAllPeopleContacted = TryCatch(async (req, res) => {
//   const contacts = await ContactUsModal.find({});
//   return res.status(200).send(contacts);
// });

// Controller
export const getAllPeopleContacted = TryCatch(async (req, res) => {
  const { search, startDate, endDate } = req.query;

  const filter = {};

  // Search across multiple fields
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { mobile: { $regex: search, $options: "i" } },
      { study: { $regex: search, $options: "i" } },
    ];
  }

  // Date filter (createdAt)
  if (startDate || endDate) {
    filter.createdAt = {};
    if (startDate) {
      filter.createdAt.$gte = new Date(startDate);
    }
    if (endDate) {
      // endDate at 23:59:59 so we include full day
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      filter.createdAt.$lte = end;
    }
  }

  const contacts = await ContactUsModal.find(filter).sort({ createdAt: -1 });

  return res.status(200).send(contacts);
});

export const deleteContactForm = TryCatch(async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: "Id is required!" });
  await ContactUsModal.findByIdAndDelete(id);
  return res.status(204).json({ message: "Deleted" });
});
