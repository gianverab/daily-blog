import { Router } from 'express';
const router = Router();
import User, { findOne } from '../models/User';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

// Register user
router.post('/register', async (req, res) => {
  const { name, email, password, avatar } = req.body;

  try {
    let user = await findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({ name, email, password, avatar });
    await user.save();

    // Generating a JSON Web Token (JWT) when a user successfully registers
    const payload = { user: { id: user.id } };
    sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Login user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Generating a JSON Web Token (JWT) when a user successfully logs
    const payload = { user: { id: user.id } };
    sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

export default router;
