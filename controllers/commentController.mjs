import db from '../config/db.mjs';

export const createComment = async (req, res) => {
  try {
    const { postid, content } = req.body;
    const userid = req.user.id;

    if (!postid || !content) {
      return res.status(400).json({ error: 'All fields are required!' });
    }

    const result = await db.one(
      `INSERT INTO Comments (userid, postid, content) VALUES ($1, $2, $3) RETURNING *`,
      [userid, postid, content]
    );

    res.status(201).json({ message: 'Comment created successfully', comment: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating comment' });
  }
};

export const getCommentsByPostId = async (req, res) => {
  try {
    const { postid } = req.params;
    const comments = await db.any(
      'SELECT * FROM Comments WHERE postid = $1 ORDER BY datecommented DESC',
      [postid]
    );
    res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching comments' });
  }
};

export const getCommentById = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await db.one('SELECT * FROM Comments WHERE commentid = $1', [id]);
    res.status(200).json(comment);
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: 'Comment not found' });
  }
};

export const updateCommentById = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ error: 'Content is required' });
    }

    const updatedComment = await db.one(
      `UPDATE Comments SET content = $1 WHERE commentid = $2 RETURNING *`,
      [content, id]
    );

    res.status(200).json({ message: 'Comment updated successfully', comment: updatedComment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating comment' });
  }
};


export const deleteCommentById = async (req, res) => {
  try {
    const { id } = req.params;

    await db.none('DELETE FROM Comments WHERE commentid = $1', [id]);

    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting comment' });
  }
};
