import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Access denied, no token provided" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ error: "Invalid or expired token" });
  }
};

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ error: "Access denied, insufficient permissions." });
    }
    next();
  };
};

import db from '../config/db.mjs';

export const verifyOwnership = (column, table) => {
  return async (req, res, next) => {
    try {
      const resourceId = req.params.id; 
      const userId = req.user.id; 

      const resource = await db.oneOrNone(
        `SELECT * FROM ${table} WHERE ${column} = $1 AND userid = $2`,
        [resourceId, userId]
      );

      if (!resource) {
        return res.status(403).json({ error: 'Access denied. You do not own this resource.' });
      }

      next();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error while verifying ownership.' });
    }
  };
};

