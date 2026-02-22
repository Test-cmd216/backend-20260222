import { v4 as uuidv4 } from 'uuid';
import Joi from 'joi';
import asyncHandler from '../utils/asyncHandler.js';
import logger from '../utils/logger.js';
const prescriptions = [];
const schema = Joi.object({
  appointmentId: Joi.string().uuid().required(),
  patientId: Joi.string().uuid().required(),
  doctorId: Joi.string().uuid().required(),
  medication: Joi.string().required(),
  dosage: Joi.string().required(),
  duration: Joi.string().required()
});
const getAll = asyncHandler(async (req, res) => {
  res.json({ success: true, count: prescriptions.length, data: prescriptions });
});
const create = asyncHandler(async (req, res) => {
  const { error, value } = schema.validate(req.body);
  if (error) return res.status(400).json({ success: false, message: error.details[0].message });
  const prescription = { id: uuidv4(), ...value, issuedAt: new Date().toISOString() };
  prescriptions.push(prescription);
  logger.info('Prescription created: ' + prescription.id);
  res.status(201).json({ success: true, data: prescription });
});
export default { getAll, create };