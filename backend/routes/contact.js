const express = require('express');
const router = express.Router();
const Contact = require("../models/Contact");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken');

// Create contact for user
router.post('/contacts', verifyToken, async (req, res) => {
    const { userId, name,email, subject, message } = req.body;
    const newContact = new Contact({ userId, name,email,subject, message });
    try {
      const savedContact = await newContact.save();
      res.status(201).json(savedContact);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
});

// Get all contacts (only accessible to admin)
router.get('/contacts', verifyTokenAndAdmin, async (req, res) => {
    try {
      const contacts = await Contact.find();
      res.json(contacts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
});

module.exports = router;
