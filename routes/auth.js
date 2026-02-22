import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../config/config.js';
import doctorController from '../controllers/doctorController.js';
const router = express.Router();
router.post('/register', async (req, res) => {
  const { error, value } = doctorController.schema.validate(req.body);
  if (error) return res.status(400).json({ success: false, message: error.details[0].message });
  const hashedPassword = await bcrypt.hash(value.password, 12);
  const doctor = { id: doctorController.doctors.length + 1, ...value, password: hashedPassword };
  doctorController.doctors.push(doctor);
  res.status(201).json({ success: true, data: { ...doctor, password: undefined } });
});
router.post('/login', async (req, res) => {
  const doctor = doctorController.doctors.find(doc => doc.email === req.body.email);
  if (!doctor) return res.status(400).json({ success: false, message: 'Invalid email or password' });
  const isValidPassword = await bcrypt.compare(req.body.password, doctor.password);
  if (!isValidPassword) return res.status(400).json({ success: false, message: 'Invalid email or password' });
  const token = jwt.sign({ id: doctor.id }, config.JWT_SECRET, { expiresIn: config.JWT_EXPIRE });
  res.json({ success: true, token });
});
export default router;