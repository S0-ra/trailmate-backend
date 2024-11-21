import db from "../config/db.mjs";

export const createCategory = async (name) => {
  return db.one(`INSERT INTO category (id.name) values($1) RETURNING *`, [
    name,
  ]);
};

export const getAllCategory = async () => {
  return db.any("SELECT *FROM category");
};

export const getCategoryById = async (categoryid) => {
  return db.oneOrNone("SELECT * FROM categories WHERE categoryid = $1", [
    categoryid,
  ]);
};

export const updateCategoryById = async (categoryid, name, description) => {
  return db.oneOrNone(
    "UPDATE categories SET name = $1, description = $2 WHERE categoryid = $3 RETURNING *",
    [name, description, categoryid]
  );
};

export const deleteCategoryById = async (categoryid) => {
  return db.none("DELETE FROM categories WHERE categoryid = $1", [categoryid]);
};
