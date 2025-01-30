const express = require('express');
const router = express.Router();
const { create, read, remove } = require('./index.js');
const authMiddleware = require('./authMiddleware');

// Protect routes with authMiddleware
router.post('/todo/create', authMiddleware, (req, res, next) => {
//   console.log('POST /todo/create accessed');
  create(req, res, next);
});

router.get('/todos', authMiddleware, (req, res, next) => {
//   console.log('GET /todos accessed');
  read(req, res, next);
});

router.delete('/todo/:id', authMiddleware, (req, res, next) => {
  console.log(`DELETE /todo/${req.params.id} accessed`);
  remove(req, res, next);
});

module.exports = router;