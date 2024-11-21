import db from "../config/db.mjs";

export const createUser = async (name, email, password, role) => {
  const query = `
    INSERT INTO "users" (name,email,password,role,datejoined)
    VALUES ($1,$2,$3,$4,CURRENT_DATE)
    RETURNING *;
    `;
  return db.one(query, [name, email, password, role]);
};

export const findUserByEmail = async (email) => {
  const query = `SELECT * FROM "users" WHERE email=$1;`;
  return db.oneOrNone(query, [email]);
};

export const findUserById = async (id) => {
  const query = `SELECT * FROM "users" WHERE userid=$1;`;
  return db.oneOrNone(query, [id]);
};

export const updateUserById = async (id, updatedFields) => {
  const fields = [];
  const values = [];

  let index = 1;
  for (const key in updatedFields) {
    fields.push(`${key} = $${index}`);
    values.push(updatedFields[key]);
    index++;
  }

  if (fields.length === 0) {
    throw new Error("No fields provided to update.");
  }

  const query = `
      UPDATE "users"
      SET ${fields.join(", ")}
      WHERE "userid" = $${index}
      RETURNING *;
  `;

  values.push(id);

  return db.oneOrNone(query, values);
};

export const deleteUserById = async (id) => {
  try {
    const query = `
      DELETE FROM "users"
      WHERE "userid" = $1
      RETURNING *;
    `;

    const result = await db.query(query, [id]);


    console.log('Delete result:', result);

   
    if (!result || !result.rows || result.rowCount === 0) {
      throw new Error("User not found or already deleted.");
    }

    
    return result.rows[0];
  } catch (err) {
    console.error('Error deleting user:', err);
    return {
      error: "Error deleting user",
      details: err.message || err
    };
  }
};

