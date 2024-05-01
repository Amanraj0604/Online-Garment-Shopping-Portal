const express = require('express');
const router = express.Router();
const Address = require('../models/Address');
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken');
// POST - Create a new address
router.post('/', verifyTokenAndAuthorization, async (req, res) => {
  try {
    const address = new Address(req.body);
    const savedAddress = await address.save();
    res.json(savedAddress);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET - Retrieve all addresses for a specific user
router.get('/:userId', verifyTokenAndAuthorization, async (req, res) => {
    try {
      // Find addresses based on userId
      const addresses = await Address.find({ userId: req.params.userId });
      res.json(addresses); // Send the addresses as JSON response
    } catch (error) {
      res.status(500).json({ message: error.message }); // Handle errors
    }
  });

// GET - Retrieve a specific address by ID
router.get('/address/:id', verifyTokenAndAuthorization, async (req, res) => {
  try {
    const address = await Address.findById(req.params.id);
    res.json(address);
  } catch (error) {
    res.status(404).json({ message: 'Address not found' });
  }
});

// PUT - Update an existing address
router.put('/:userId', verifyTokenAndAuthorization, async (req, res) => {
  try {
    const filter = { userId: req.params.userId }; // Filter to find the address by userId
    const update = req.body; // Data to update

    // Find the address document by userId and update it
    const updatedAddress = await Address.findOneAndUpdate(filter, update, { new: true });

    if (!updatedAddress) {
      return res.status(404).json({ message: 'Address not found' });
    }

    res.json(updatedAddress);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// DELETE - Delete an address
router.delete('/:id', verifyTokenAndAuthorization,async (req, res) => {
  try {
    await Address.findByIdAndDelete(req.params.id);
    res.json({ message: 'Address deleted successfully' });
  } catch (error) {
    res.status(404).json({ message: 'Address not found' });
  }
});

module.exports = router;
