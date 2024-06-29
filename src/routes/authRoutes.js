import express from 'express';
import { register, login, requestPasswordReset, confirmPasswordReset } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/reset-password/request', requestPasswordReset);
router.post('/reset-password/confirm', confirmPasswordReset);

export default router;
