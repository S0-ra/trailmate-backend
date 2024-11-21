import express from "express";
import { createReview, listReviews } from "../controllers/reviewController.mjs";
import { authenticateToken } from "../middleware/auth.mjs";

const router = express.Router();

router.post("/", authenticateToken, createReview);
router.get("/:equipmentid", listReviews);

export default router;
