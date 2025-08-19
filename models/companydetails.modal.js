import mongoose from "mongoose";

const companyDetails = new mongoose.Schema({
  logo: {
    type: String,
    default: null,
  },
});

const CompanyDetails = mongoose.model("CompanyDetails", companyDetails);
export default CompanyDetails;
