const express = require('express');
const router = express.Router();
const Class = require('../model/class');

// Get all classes
router.get('/', async (req, res) => {
  try {
    const classes = await Class.find();
    res.json(classes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new class
router.post('/', async (req, res) => {
  const classObj = new Class(req.body);
  try {
    const newClass = await classObj.save();
    res.status(201).json(newClass);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
