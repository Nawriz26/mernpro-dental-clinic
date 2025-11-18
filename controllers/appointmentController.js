import asyncHandler from 'express-async-handler';
import Appointment from '../models/appointmentModel.js';

// @desc    Get all appointments for logged-in user
// @route   GET /api/appointments
// @access  Private
export const getAppointments = asyncHandler(async (req, res) => {
  const appointments = await Appointment.find({ user: req.user._id })
    .sort({ date: 1, time: 1 });

  res.json(appointments);
});

// @desc    Create new appointment
// @route   POST /api/appointments
// @access  Private
export const createAppointment = asyncHandler(async (req, res) => {
  const { patientName, date, time, reason, status } = req.body;

  if (!patientName || !date || !time) {
    res.status(400);
    throw new Error('patientName, date and time are required');
  }

  const appointment = await Appointment.create({
    patientName,
    date,
    time,
    reason,
    status: status || 'Scheduled',
    user: req.user._id,
  });

  res.status(201).json(appointment);
});

// @desc    Update appointment
// @route   PUT /api/appointments/:id
// @access  Private
export const updateAppointment = asyncHandler(async (req, res) => {
  const appt = await Appointment.findById(req.params.id);

  if (!appt) {
    res.status(404);
    throw new Error('Appointment not found');
  }

  // ensure only owner can modify
  if (appt.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized to update this appointment');
  }

  appt.patientName = req.body.patientName ?? appt.patientName;
  appt.date = req.body.date ?? appt.date;
  appt.time = req.body.time ?? appt.time;
  appt.reason = req.body.reason ?? appt.reason;
  appt.status = req.body.status ?? appt.status;

  const updated = await appt.save();
  res.json(updated);
});

// @desc    Delete appointment
// @route   DELETE /api/appointments/:id
// @access  Private
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
