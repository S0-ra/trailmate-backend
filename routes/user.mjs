import express from "express";
import {
  registerUser,
  loginUser,
  getUserDetails,
  updateUser,
  deleteUser,
} from "../controllers/userController.mjs";
import { authenticateToken, authorizeRoles } from "../middleware/auth.mjs";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/users/:id", authenticateToken, getUserDetails);
router.put("/users/:id", authenticateToken, updateUser);
router.delete(
  "/users/:id",
  authenticateToken,
  authorizeRoles("admin"),
  deleteUser
);

export default router;
