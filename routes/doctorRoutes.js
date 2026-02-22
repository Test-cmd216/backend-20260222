import express from 'express';
import doctorController from '../controllers/doctorController.js';
const router = express.Router();
router.get('/', doctorController.getAll);
router.post('/', doctorController.create);
export default router;