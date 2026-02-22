import { v4 as uuidv4 } from 'uuid';
import Joi from 'joi';
import asyncHandler from '../utils/asyncHandler.js';
import logger from '../utils/logger.js';
const patients = [];
const schema = Joi.object({
  firstName: Joi.string().min(2).max(100).required(),
  lastName: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  dateOfBirth: Joi.date().required(),
  bloodGroup: Joi.string().required(),
  address: Joi.string().required()
});
const getAll = asyncHandler(async (req, res) => {
  res.json({ success: true, count: patients.length, data: patients });
});
const create = asyncHandler(async (req, res) => {
  const { error, value } = schema.validate(req.body);
  if (error) return res.status(400).json({ success: false, message: error.details[0].message });
  const patient = { id: uuidv4(), ...value, createdAt: new Date().toISOString() };
  patients.push(patient);
  logger.info('Patient created: ' + patient.id);
  res.status(201).json({ success: true, data: patient });
});
export default { getAll, create };