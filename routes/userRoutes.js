import express from "express";
import {
  register,
  login,
  updateUserProfile,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.put('/profile', protect, updateUserProfile);

export default router;
