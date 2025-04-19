import express from 'express';
const router = express.Router();
import db from '../db.js';

router.post('/', async (req, res) => {
  const { mentee_id, mentor_id } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO mentorship_requests (mentee_id, mentor_id) VALUES ($1, $2) RETURNING *',
      [mentee_id, mentor_id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM mentorship_requests');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
