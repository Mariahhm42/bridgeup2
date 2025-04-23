// src/routes/users.js
import express from 'express';
const router = express.Router();

const users = [];

router.post('/', (req, res) => {
  const { name, field, bio, role } = req.body;
  if (!name || !field || !bio || !role) {
    return res.status(400).json({ error: 'Missing user data' });
  }
  const id = String(Date.now());
  const newUser = { id, name, field, bio, role };
  users.push(newUser);
  res.status(201).json(newUser);
});

router.get('/:id', (req, res) => {
  const user = users.find((u) => u.id === req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({ id: user.id, name: user.name });
});

export { users }; // export this to share across files
export default router;
