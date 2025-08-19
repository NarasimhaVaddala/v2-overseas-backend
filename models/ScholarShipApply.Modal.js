import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
  transcript: { type: String },
  passport: { type: String },
  englishProof: { type: String },
  statement: { type: String },
  scores: { type: String },
  recommendation: { type: String },
  certificates: { type: String },
});

const scholarshipSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    mobile: { type: String, required: true },
    email: { type: String, required: true },
    university: { type: String },
    graduation: { type: String },
    course: { type: String },
    documents: documentSchema,
  },
  { timestamps: true }
);

const ApplyScholarShip = mongoose.model("ApplyScholarship", scholarshipSchema);
export default ApplyScholarShip;
