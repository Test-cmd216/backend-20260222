import { v4 as uuidv4 } from 'uuid';
import Joi from 'joi';
import asyncHandler from '../utils/asyncHandler.js';
import logger from '../utils/logger.js';
import bcrypt from 'bcryptjs';
const doctors = [];
const schema = Joi.object({
  firstName: Joi.string().min(2).max(100).required(),
  lastName: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(100).required(),
  specialization: Joi.string().required(),
  licenseNumber: Joi.string().required()
});
const getAll = asyncHandler(async (req, res) => {
  res.json({ success: true, count: doctors.length, data: doctors.map(doc => ({ ...doc, password: undefined })) });
});
const create = asyncHandler(async (req, res) => {
  const { error, value } = schema.validate(req.body);
  if (error) return res.status(400).json({ success: false, message: error.details[0].message });
  const hashedPassword = await bcrypt.hash(value.password, 12);
  const doctor = { id: uuidv4(), ...value, password: hashedPassword, createdAt: new Date().toISOString() };
  doctors.push(doctor);
  logger.info('Doctor created: ' + doctor.id);
  res.status(201).json({ success: true, data: { ...doctor, password: undefined } });
});
export default { getAll, create };