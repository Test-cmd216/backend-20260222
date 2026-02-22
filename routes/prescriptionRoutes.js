import express from 'express';
import prescriptionController from '../controllers/prescriptionController.js';
const router = express.Router();
router.get('/', prescriptionController.getAll);
router.post('/', prescriptionController.create);
export default router;