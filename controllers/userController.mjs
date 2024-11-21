import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  createUser,
  findUserByEmail,
  findUserById,
  updateUserById,
} from "../models/user.mjs";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
      return res.status(400).json({ error: "All fields are required!" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await createUser(
      name,
      email,
      hashedPassword,
      role || "user"
    );
    res.status(201).json({
      message: "User registered successfully!",
      user: newUser,
    });
  } catch (err) {
    res
      .status(500)
      .json({ error: "An error occurred while registering the user." });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);
    console.log("User found:", user);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        msg: "Invalid email or password",
      });
    }
    const token = jwt.sign(
      { id: user.userid, role: user.role },
      process.env.SECRET,
      {
        expiresIn: "1d",
      }
    );
    console.log("JWT Secret:", process.env.SECRET);
    res.json({ msg: "Login successfull", token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error logging in", error: err.message });
  }
};

export const getUserDetails = async (req, res) => {
  try {
    const user = await findUserById(req.params.id);
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error fetching user details", details: err.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const updatedUser = await updateUserById(req.params.id, req.body);
    res.json({ message: "User updated successfully", updateUser });
  } catch (err) {
    res.status(500).json({
      error: "Error updateing user details",
      details: err.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    await deleteUser(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error deleting user", details: err.message });
  }
};
