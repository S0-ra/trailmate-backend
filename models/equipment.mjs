import db from "../config/db.mjs";

export const addEquipment = async (
  userid,
  categoryid,
  name,
  description,
  noofitems,
  availabilitystatus,
  location
) => {
  const query = `
    INSERT INTO equipment (userid, categoryid, name, description, noofitems, availabilitystatus, location, dateadded)
    VALUES ($1, $2, $3, $4, $5, $6, $7, CURRENT_DATE)
    RETURNING *;
  `;
  return db.one(query, [
    userid,
    categoryid,
    name,
    description,
    noofitems,
    availabilitystatus,
    location,
  ]);
};

export const getEquipmentById = async (equipmentid) => {
  return await db.oneOrNone(`SELECT * FROM equipment WHERE equipmentid = $1`, [
    equipmentid,
  ]);
};

export const getAllEquipment = async () => {
  return await db.manyOrNone(`SELECT * FROM equipment`);
};

export const updateEquipment = async (equipmentid, updates) => {
  const fields = Object.keys(updates)
    .map((key, idx) => `${key} = $${idx + 2}`)
    .join(", ");
  const values = Object.values(updates);
  return await db.one(
    `UPDATE equipment SET ${fields} WHERE equipmentid = $1 RETURNING *`,
    [equipmentid, ...values]
  );
};

export const deleteEquipment = async (equipmentid) => {
  return await db.none(`DELETE FROM equipment WHERE equipmentid = $1`, [
    equipmentid,
  ]);
};

export const searchEquipmentByName = async (searchQuery) => {
  return db.any("SELECT * FROM equipment WHERE LOWER(name) LIKE LOWER($1)", [
    `%${searchQuery}%`,
  ]);
};

export const filterEquipment = async (categoryid, minPrice, maxPrice) => {
  return db.any(
    "SELECT * FROM equipment WHERE ($1::INT IS NULL OR categoryid = $1) AND ($2::NUMERIC IS NULL OR price >= $2) AND ($3::NUMERIC IS NULL OR price <= $3)",
    [categoryid, minPrice, maxPrice]
  );
};
