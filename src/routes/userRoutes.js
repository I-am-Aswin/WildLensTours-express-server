import express from 'express';
import { getUserProfile, updateUserProfile } from '../controllers/userController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use( protect );

router.get('/profile', getUserProfile);
router.put('/profile', updateUserProfile);

export default router;
