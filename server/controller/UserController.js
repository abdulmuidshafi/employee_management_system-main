import User from "../models/User.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
//import { sendResetPasswordEmail } from '../utils/emailUtils.js'; 

export const getAll = asyncHandler(async (req, res) => {
  let users = await User.find({role:{$ne:"admin"}});
  res.status(200).json(users);
});
export const getUser = asyncHandler(async (req, res) => {
  const {id} = req.params
  let user = await User.findById(id);
  if (!user) {
    res.status(404);
    throw new Error("user not found");
  }
  res.status(200).json(user);
});
export const createUser = asyncHandler(async (req, res) => {
  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(req.body.password, salt);
  console.log(hashPassword);

  let user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
    role: req.body.role,
    phone: req.body.phone,
  });
  if (!user) {
    res.status(500);
    throw new Error("error creating user");
  }
  res.status(201).json(user);
});
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  const user = await User.findOne({ email: email });
  if (!user) {
    res.status(404);
    throw new Error("user not found");
  }
  if (!user.active) {
    res.status(401)
    throw new Error("user diactiveted");
  }
  let isMatch = await user.ispasswordmatch(password);
  if (!isMatch) {
    res.status(401);
    throw Error("wrong password");
  }

  res.status(200).json(user);
}); 
export const forgetPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const resetToken = generateResetToken();
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000;
    await user.save();

    await sendResetPasswordEmail(user.email, resetToken);

    res.status(200).json({ message: 'Reset password instructions sent to your email address' });
  } catch (error) {
    console.error('Error sending reset password request:', error);
    res.status(500).json({ message: 'Error sending reset password request' });
  }
};

export const resetPassword = async (req, res) => {
  const { token, password } = req.body;

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ message: 'Error resetting password' });
  }
}; 
//
export const activateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  User.findByIdAndUpdate(
    { _id: id },
    {
      $set: {
        active: true,
      },
    },
    { new: true }
  )
    .then((response) => {
      if (!response) {
        res.status(404).json({ message: 'User not found' });
      } else {
        if (req.user && req.user._id.toString() === id) { 
        }
        res.status(200).json(response);
      }
    })
    .catch((error) => {
      console.error('Error activating user:', error);
      res.status(500).json({ message: 'Error activating user' });
    });
});
export const diactivateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  User.findByIdAndUpdate(
    { _id: id },
    {
      $set: {
        active: false,
      },
    },
    { new: true }
  )
    .then((response) => {
      if (!response) {
        res.status(404).json({ message: 'User not found' });
      } else {
        if (req.user && req.user._id.toString() === id) { 
        }
        res.status(200).json(response);
      }
    })
    .catch((error) => {
      console.error('Error deactivating user:', error);
      res.status(500).json({ message: 'Error deactivating user' });
    });
});
/*
export const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, email, password, role, phone } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      id,
      {
        $set: {
          name,
          email,
          password,
          role,
          phone,
        },
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Error updating user' });
  }
});*/
//update user 
export const updateUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const {name, email, password, role, phone } = req.body;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }

    user.name = name;
    user.email = email;
user.password=password;
user.role=role;
user.phone=phone;

    const updatedUser = await User.save();

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});
