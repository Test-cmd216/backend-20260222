import express from 'express';
import appointmentController from '../controllers/appointmentController.js';
const router = express.Router();
router.get('/', appointmentController.getAll);
router.post('/', appointmentController.create);
export default router;