import db from "../config/db.mjs";

export const addReview = async (equipmentid, userid, rating, reviewtext) => {
  return db.one(
    "INSERT INTO reviews (equipmentid, userid, rating, reviewtext) VALUES ($1, $2, $3, $4) RETURNING *",
    [equipmentid, userid, rating, reviewtext]
  );
};

export const getReviewsByEquipment = async (equipmentid) => {
  return db.any("SELECT * FROM reviews WHERE equipmentid = $1", [equipmentid]);
};

export const searchEquipmentByName = async (searchQuery) => {
  return db.any(
    "SELECT * FROM equipment WHERE LOWER(name) LIKE LOWER($1)",
    [`%${searchQuery}%`]
  );
};
