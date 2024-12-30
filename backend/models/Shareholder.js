const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Shareholder Schema
const shareholderSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true, // Link to the user account
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female'],
    required: true,
  },
  placeOfBirth: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  idCard: {
    type: String,
    enum: ['Carte d\'électeur', 'Passport'],
  },
  profession: {
    type: String,
  },
  address: {
    type: String,
  },
  accountType: {
    type: String,
    enum: ['Type 1', 'Type 2', 'Type 3', 'Type 4', 'Type 5'],
    required: true,
  },
  hasAssociate: {
    type: Boolean,
    required: true,
  },
  associate: {
    name: String,
    email: String,
    phone: String,
    address: String,
  },
  sharesOwned: {
    type: Number,
    default: 0, // Tracks the number of shares owned by the shareholder
  },
  contributions: {
    type: Number,
    default: 0, // Tracks total contributions made by the shareholder
  },
  dividendsReceived: {
    type: Number,
    default: 0, // Tracks dividends received by the shareholder
  },
  submissionAgreement: {
    type: Boolean,
    required: true,
    default: false, // Ensures shareholder agreed to terms and conditions
  },  
  dateOfApplication: {
    type: Date,
    default: Date.now,
  },
  group: {
    type: String,
    enum: ['Premium 1', 'Diamond', 'Gold', 'Silver'],
    default: 'Silver', // Admin updates this field later
  },
});

module.exports = mongoose.model('Shareholder', shareholderSchema);

