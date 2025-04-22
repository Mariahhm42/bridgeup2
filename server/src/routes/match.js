// server/routes/match.js
const express = require('express');
const router = express.Router();

const mentorsQueue = [];
const menteesQueue = [];

router.post('/', (req, res) => {
  const { id, role } = req.body;

  if (!id || !role) {
    return res.status(400).json({ error: "Missing id or role" });
  }

  if (role === 'mentor') {
    if (menteesQueue.length > 0) {
      const menteeId = menteesQueue.shift();
      return res.json({ matched: true, mentorId: id, menteeId });
    } else {
      mentorsQueue.push(id);
      return res.json({ matched: false });
    }
  }

  if (role === 'mentee') {
    if (mentorsQueue.length > 0) {
      const mentorId = mentorsQueue.shift();
      return res.json({ matched: true, mentorId, menteeId: id });
    } else {
      menteesQueue.push(id);
      return res.json({ matched: false });
    }
  }

  return res.status(400).json({ error: "Invalid role" });
});

module.exports = router;
