import express from 'express';
import { authenticateToken, verifyOwnership } from '../middleware/auth.mjs';
import {
  createPost,
  getAllPosts,
  getPostById,
  updatePostById,
  deletePostById,
} from '../controllers/postController.mjs';

const router = express.Router();


router.post('/', authenticateToken, createPost);
router.get('/', getAllPosts);
router.get('/:id', getPostById);
router.put('/:id', authenticateToken, verifyOwnership('postid', 'Posts'), updatePostById);
router.delete('/:id', authenticateToken, verifyOwnership('postid', 'Posts'), deletePostById);

export default router;
