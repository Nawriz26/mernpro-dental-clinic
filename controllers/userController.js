import asyncHandler from 'express-async-handler';
import User from "../models/user.js";
import { signToken } from "../utils/token.js";

const register = async (req, res, next) => {
  try {
    const { username, email, password, role } = req.body;
    const exists = await User.findOne({ $or: [{ email }, { username }] });
    if (exists) {
      res.status(400);
      throw new Error("User already exists");
    }
    const user = await User.create({ username, email, password, role });
    const token = signToken({ id: user._id, role: user.role });
    res.status(201).json({ token, user: { id: user._id, username, email, role: user.role } });
  } catch (e) { next(e); }
};

const login = async (req, res, next) => {
  try {
    const { emailOrUsername, password } = req.body;
    const user = await User.findOne({ $or: [{ email: emailOrUsername }, { username: emailOrUsername }] });
    if (!user || !(await user.comparePassword(password))) {
      res.status(401);
      throw new Error("Invalid credentials");
    }
    const token = signToken({ id: user._id, role: user.role });
    res.json({ token, user: { id: user._id, username: user.username, email: user.email, role: user.role } });
  } catch (e) { next(e); }
};

// @desc    Update logged-in user's profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  // Update allowed fields
  user.username = req.body.username || user.username;
  user.email = req.body.email || user.email;
  // optionally password:
  if (req.body.password) {
    user.password = req.body.password; // assuming your schema has pre-save hash
  }

  const updatedUser = await user.save();

  res.json({
    _id: updatedUser._id,
    username: updatedUser.username,
    email: updatedUser.email,
    role: updatedUser.role,
  });
});

export {
  register,
  login,
  updateUserProfile,
};

