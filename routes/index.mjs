import express from "express";
import userRoutes from "./user.mjs";
import equipmentRoutes from "./equipment.mjs";
import discussionRoutes from "./discussion.mjs";
import categoryRoutes from "./category.mjs";
import reviewRoutes from "./review.mjs";
import adminRoutes from "./admin.mjs";
import postRoutes from "./post.mjs";
import commentRoutes from "./comment.mjs";

const router = express.Router();

router.use(userRoutes);
router.use("/equipment", equipmentRoutes);
router.use("/discussions", discussionRoutes);
router.use("/category", categoryRoutes);
router.use("/review", reviewRoutes);
router.use("/admin", adminRoutes);
router.use('/posts',postRoutes)
router.use("/comments", commentRoutes);

export default router;
