import express from 'express';
import patientController from '../controllers/patientController.js';
const router = express.Router();
router.get('/', patientController.getAll);
router.post('/', patientController.create);
export default router;