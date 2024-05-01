const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  phoneNo: {
    type: String,
    required: true
  },
  pincode: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  locality: {
    type: String,
    required: true
  },
  flatNo: {
    type: String,
    required: true
  },
  landmark: {
    type: String
  },
  addressType: {
    type: String,
    enum: ['home', 'office'], // Only allows 'home' or 'office' as values
    required: true
  }
});

const Address = mongoose.model('Address', addressSchema);

module.exports = Address;
