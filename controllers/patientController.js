import Patient from "../models/patient.js";

export const getPatients = async (_req, res, next) => {
  try { res.json(await Patient.find().sort({ createdAt: -1 })); }
  catch (e) { next(e); }
};

export const getPatient = async (req, res, next) => {
  try {
    const p = await Patient.findById(req.params.id);
    if (!p) { res.status(404); throw new Error("Patient not found"); }
    res.json(p);
  } catch (e) { next(e); }
};

export const createPatient = async (req, res, next) => {
  try { res.status(201).json(await Patient.create(req.body)); }
  catch (e) { next(e); }
};

export const updatePatient = async (req, res, next) => {
  try {
    const p = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!p) { res.status(404); throw new Error("Patient not found"); }
    res.json(p);
  } catch (e) { next(e); }
};

export const deletePatient = async (req, res, next) => {
  try {
    const p = await Patient.findByIdAndDelete(req.params.id);
    if (!p) { res.status(404); throw new Error("Patient not found"); }
    res.json({ message: "Deleted" });
  } catch (e) { next(e); }
};
