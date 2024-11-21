import express from "express";
import { getDashboardStats } from "../controllers/adminController.mjs";
import { authenticateToken, authorizeRoles } from "../middleware/auth.mjs";

const router = express.Router();

router.get("/dashboard-stats", authenticateToken, authorizeRoles(["admin"]), getDashboardStats);

export default router;
