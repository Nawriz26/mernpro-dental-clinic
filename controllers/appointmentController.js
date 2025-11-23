import asyncHandler from 'express-async-handler';
import Appointment from '../models/appointmentModel.js';
import Patient from '../models/patient.js';


export const getAppointments = asyncHandler(async (req, res) => {
  const appointments = await Appointment.find({ user: req.user._id })
    .populate('patientId', 'name email phone')
    .sort({ date: 1, time: 1 });

  res.json(appointments);
});


export const createAppointment = asyncHandler(async (req, res) => {
  const { patientId, date, time, reason, status } = req.body;

  if (!patientId || !date || !time) {
    res.status(400);
    throw new Error('patientId, date and time are required');
  }

  const patient = await Patient.findById(patientId);
  if (!patient) {
    res.status(404);
    throw new Error('Patient not found for given patientId');
  }

  const appointment = await Appointment.create({
    patientId,
    patientName: patient.name,        
    date,
    time,
    reason,
    status: status || 'Scheduled',
    user: req.user._id,
  });

  res.status(201).json(appointment);
});


export const updateAppointment = asyncHandler(async (req, res) => {
  const appt = await Appointment.findById(req.params.id);

  if (!appt) {
    res.status(404);
    throw new Error('Appointment not found');
  }

  // only owner can edit
  if (appt.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized to update this appointment');
  }

  const { patientId, date, time, reason, status } = req.body;

  // If patientId changed, re-link and refresh patientName
  if (patientId && patientId !== appt.patientId.toString()) {
    const patient = await Patient.findById(patientId);
    if (!patient) {
      res.status(404);
      throw new Error('Patient not found for given patientId');
    }
    appt.patientId = patientId;
    appt.patientName = patient.name;
  }

  appt.date = date ?? appt.date;
  appt.time = time ?? appt.time;
  appt.reason = reason ?? appt.reason;
  appt.status = status ?? appt.status;

  const updated = await appt.save();
  res.json(updated);
});


export const deleteAppointment = asyncHandler(async (req, res) => {
  const appt = await Appointment.findById(req.params.id);

  if (!appt) {
    res.status(404);
    throw new Error('Appointment not found');
  }

  if (appt.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized to delete this appointment');
  }

  await appt.deleteOne();
  res.json({ message: 'Appointment removed' });
});
