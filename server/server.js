const express = require('express');
const cors = require('cors'); // Optional: if using client/server on different ports
const app = express();
const PORT = 8000; // or whatever port you're using

// In-memory storage
const mentorsQueue = [];
const menteesQueue = [];
const users = []; // NEW: stores user profiles

// Middleware
app.use(cors()); // Only needed if frontend is on a different port
app.use(express.json());

// --------------------
// POST /api/users — create user
app.post('/api/users', (req, res) => {
  const { name, field, bio, role } = req.body;

  if (!name || !field || !bio || !role) {
    return res.status(400).json({ error: 'Missing user data' });
  }

  const id = String(Date.now()); // Simple unique ID
  const newUser = { id, name, field, bio, role };

  users.push(newUser);

  res.status(201).json(newUser);
});

// --------------------
// GET /api/users/:id — fetch user by ID
app.get('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  const user = users.find((u) => u.id === userId);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.json({ id: user.id, name: user.name });
});

// --------------------
// POST /api/match — match mentor/mentee
app.post('/api/match', (req, res) => {
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

// --------------------
// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
