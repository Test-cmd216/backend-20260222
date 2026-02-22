import { v4 as uuidv4 } from 'uuid';
import Joi from 'joi';
import asyncHandler from '../utils/asyncHandler.js';
import logger from '../utils/logger.js';
const appointments = [];
const schema = Joi.object({
  patientId: Joi.string().uuid().required(),
  doctorId: Joi.string().uuid().required(),
  appointmentDate: Joi.date().required(),
  reason: Joi.string().required(),
  status: Joi.string().required(),
  notes: Joi.string().required()
});
const getAll = asyncHandler(async (req, res) => {
  res.json({ success: true, count: appointments.length, data: appointments });
});
const create = asyncHandler(async (req, res) => {
  const { error, value } = schema.validate(req.body);
  if (error) return res.status(400).json({ success: false, message: error.details[0].message });
  const appointment = { id: uuidv4(), ...value, createdAt: new Date().toISOString() };
  appointments.push(appointment);
  logger.info('Appointment created: ' + appointment.id);
  res.status(201).json({ success: true, data: appointment });
});
export default { getAll, create };