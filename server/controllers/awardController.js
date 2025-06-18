const Award = require("../models/award");
const { db } = require("../config/db"); // Your MySQL connection

const getAwards = async (req, res) => {
  try {
    const [rows] = await db.query(`
    SELECT awards.*, users.name AS recipient_name
    FROM awards
    LEFT JOIN users ON awards.user_id = users.id
  `);
    res.json(rows);
  } catch (err) {
    console.error(err.sqlMessage);
    res.status(500).json({ error: err.sqlMessage });
  }
};

const createAward = async (req, res) => {
  const { title, description, recipient, awarded_date } = req.body;
  const sql = `INSERT INTO awards (title, description, recipient, award_date) VALUES (?, ?, ?, ?)`;
  try {
    const [result] = await db.query(sql, [
      title,
      description,
      recipient,
      awarded_date,
    ]);
    res.status(201).json({ message: "Award created", id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

const updateAward = async (req, res) => {
  const { id } = req.params;
  const { title, description, recipient, awarded_date } = req.body;
  const sql = `UPDATE awards SET title = ?, description = ?, recipient = ?, awarded_date = ? WHERE id = ?`;
  db.query(
    sql,
    [title, description, recipient, awarded_date, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.affectedRows === 0)
        return res.status(404).json({ message: "Award not found" });
      res.json({ message: "Award updated" });
    }
  );
};

const deleteAward = async (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM awards WHERE id = ?`;
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Award not found" });
    res.json({ message: "Award deleted" });
  });
};

const getAwardStats = async (req, res) => {
  const { startDate, endDate } = req.query;

  try {
    const sql = `
      SELECT DATE(award_date) as date, COUNT(*) as awardsCount
      FROM awards
      WHERE award_date BETWEEN ? AND ?
      GROUP BY DATE(award_date)
      ORDER BY DATE(award_date)
    `;
    const [rows] = await db.query(sql, [startDate, endDate]);
    res.json(rows);
  } catch (err) {
    console.error("Stats error:", err.message);
    res.status(500).json({ message: "Error fetching stats" });
  }
};

module.exports = {
  getAwards,
  createAward,
  updateAward,
  deleteAward,
  getAwardStats,
};
