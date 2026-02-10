import express from 'express';
import { protect } from '../middleware/auth.js';
import { 
  register, 
  login, 
  verifyToken, 
  updateProfile, 
  changePassword 
} from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/verify', protect, verifyToken);
router.put('/update-profile', protect, updateProfile);
router.put('/change-password', protect, changePassword);

export default router;
