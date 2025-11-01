import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
  {
    name:  { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    phone: { type: String, required: true },
    dateOfBirth: Date,
    address: String,
    notes: String
  },
  { timestamps: true }
);

export default mongoose.model("Patient", patientSchema);
