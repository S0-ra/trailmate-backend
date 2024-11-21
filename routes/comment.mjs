import express from 'express';
import { authenticateToken, verifyOwnership } from '../middleware/auth.mjs';
import {  
  createComment,
  getCommentsByPostId,
  getCommentById,
  updateCommentById,
  deleteCommentById,
} from '../controllers/commentController.mjs';

const router = express.Router();

// Routes
router.post('/', authenticateToken, createComment);
router.get('/post/:postid', getCommentsByPostId);
router.get('/:id', getCommentById);
router.put('/:id', authenticateToken, verifyOwnership('commentid', 'Comments'), updateCommentById);
router.delete('/:id', authenticateToken, verifyOwnership('commentid', 'Comments'), deleteCommentById);

export default router;
