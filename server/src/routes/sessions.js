import express from 'express';
const router = express.Router();
import db from '../db.js';

router.post('/', async (req, res) => {
  const { mentor_id, mentee_id, notes } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO sessions (mentor_id, mentee_id, notes) VALUES ($1, $2, $3) RETURNING *',
      [mentor_id, mentee_id, notes]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM sessions');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;