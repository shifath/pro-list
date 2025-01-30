const express = require('express');
const router = express.Router();
const passport = require('../passportConfig'); // Adjust the path to your passportConfig file
const bcrypt = require('bcryptjs');
const pool = require('../model/database'); // Adjust the path to your database file

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
  // console.log('authenticating');
    if (err) return next(err);
    if (!user) {
      console.log('no user');
      res.set('Content-Type', 'application/json');
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    req.logIn(user, (err) => {
  // console.log('logging in');

      // console.log(req.login);
      if (err) return next(err);
      res.set('Content-Type', 'application/json');
      return res.status(200).json({ message: 'Login successful' });
    });
  })(req, res, next);
});

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await pool.query('INSERT INTO users (username, password_hash) VALUES ($1, $2)', [username, hashedPassword]);
    res.set('Content-Type', 'application/json');
    res.status(201).json({ message: 'Registration successful' });
  } catch (err) {
    res.set('Content-Type', 'application/json');
    res.status(500).json({ error: err.message });
  }
});

router.post('/logout', (req, res) => {
  console.log('logging out');
  req.logout((err) => {
    if (err) { return next(err); }
    res.status(200).json({ message: 'Logout successful' });
  });
  // res.set('Content-Type', 'application/json');
});
router.get('/checkuser', (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json({ message: 'User is authenticated' });
  } else {
    res.status(401).json({ message: 'User is not authenticated' });
  }
});
module.exports = router;