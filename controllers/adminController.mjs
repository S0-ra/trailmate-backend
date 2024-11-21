import db from "../config/db.mjs";

export const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await db.one(
      "SELECT COUNT(*) AS count FROM users",
      [],
      (data) => +data.count
    );
    const totalEquipment = await db.one(
      "SELECT COUNT(*) AS count FROM equipment",
      [],
      (data) => +data.count
    );
    const totalCategories = await db.one(
      "SELECT COUNT(*) AS count FROM categories",
      [],
      (data) => +data.count
    );

    res.json({
      totalUsers,
      totalEquipment,
      totalCategories,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
