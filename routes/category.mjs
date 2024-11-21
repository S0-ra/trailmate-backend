import express from "express";
import {
  addCategory,
  listCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.mjs";
import { authenticateToken, authorizeRoles } from "../middleware/auth.mjs";

const router = express.Router();

// Public Routes
router.get("/", listCategories);

// Admin-only routes
router.post("/", authenticateToken, authorizeRoles(["admin"]), addCategory);
router.get("/:id", authenticateToken, authorizeRoles(["admin"]), getCategory);
router.put("/:id", authenticateToken, authorizeRoles(["admin"]), updateCategory);
router.delete("/:id", authenticateToken, authorizeRoles(["admin"]), deleteCategory);

export default router;
