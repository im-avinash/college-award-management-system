const db = require('../config/db');

const getAllAwards = async () => {
  const [rows] = await db.query('SELECT * FROM awards');
  return rows;
};

const createAward = async (title, description, userId) => {
  const [result] = await db.query(
    'INSERT INTO awards (title, description, user_id) VALUES (?, ?, ?)',
    [title, description, userId]
  );
  return result.insertId;
};

module.exports = {
  getAllAwards,
  createAward,
};
