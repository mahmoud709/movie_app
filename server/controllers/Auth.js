import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import { statusCodes, successMsg } from '../utils/Status.js';
import jwt from 'jsonwebtoken'
import { user, validateLogin, validateSchema } from '../models/userModel.js';

export const register = asyncHandler(async (req, res) => {
  const { username, email, phone, password } = req.body;
  let hashedPassword;
  // Validation
  const { error } = validateSchema(req.body);
  if (error) {
    return res.status(statusCodes.errCode).json({ success: successMsg.failed, message: error.message });
  }
  // Check if a user with the given email already exists
  const existUser = await user.findOne({ email });
  if (existUser) {
    return res.status(statusCodes.successCode).json({ success: successMsg.failed, message: 'Email is already in exist' });
  }
  // Find user by Phone Num
  const userByPhone = await user.findOne({ phone });
  if (userByPhone) {
    return res.status(statusCodes.successCode).json({ success: successMsg.failed, message: 'Phone Number is already in exist' });
  }
  // Hash the password before saving to the database
  const salt = await bcrypt.genSalt(10);
  hashedPassword = await bcrypt.hash(password, salt);
  // Create the user and save it to the database
  await user.create({
    username,
    email,
    phone,
    password: hashedPassword,
  });
  res.status(statusCodes.successCode).json({
    success: successMsg.success,
    message: "Account created successfully",
  });
});

// Login User
export const Login = asyncHandler(async (req, res) => {
  const { email, phone, password } = req.body;
  // Validation
  const { error } = validateLogin(req.body);
  if (error) {
    return res.status(statusCodes.successCode).json({ success: successMsg.failed, message: error.details[0].message })
  }
  // Finding user in DB
  const userInfo = await user.findOne({ $or: [{ email }, { phone }] });
  // handle user is not found
  if (!userInfo) {
    return res.status(statusCodes.successCode).json({ success: successMsg.failed, message: "Invalid credentials" });
  }
  // Compare passwords
  const validPass = await bcrypt.compare(password, userInfo.password);
  if (!validPass) {
    return res.status(statusCodes.successCode).json({ success: successMsg.failed, message: "Invalid credentials" });
  }
  const tokenData = {
    id: userInfo._id,
    role: userInfo.role
  }
  const token = jwt.sign({ ...tokenData }, process.env.JWT_SECRET, {
    expiresIn: '60d',
  });
  res.status(statusCodes.successCode).json({ success: successMsg.success, message: "Login Success", token })
})