const mongoose = require('mongoose');

const providerProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  serviceCategory: {
    type: String,
    required: [true, 'Please specify a service category'],
  },
  bio: {
    type: String,
    maxlength: 500,
    default: 'No biography provided.',
  },
  experience: {
    type: Number,
    required: [true, 'Please provide years of experience'],
    min: 0,
  },
  hourlyRate: {
    type: Number,
    required: [true, 'Please set an hourly rate'],
  },
  location: {
    type: String,
    required: [true, 'Please provide a location'],
  },
  // image: {
  //   type: String,
  //   required: [true, 'Please provide an image URL'],
  // },

image: {
    type: String,
    // Make it not required initially or provide a default
    default: "https://via.placeholder.com/350x200?text=No+Image"
 },
 idProofPath: { // Add this
    type: String,
 },
 licensePath: { // Add this
    type: String,
 },




// const providerProfileSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     default: null,   // ✅ was: required: true
//     unique: true,
//   },
//   serviceCategory: {
//     type: String,
//     required: [true, 'Please specify a service category'],
//   },
//   bio: {
//     type: String,
//     maxlength: 500,
//     default: 'No biography provided.',
//   },
//   experience: {
//     type: Number,
//     required: [true, 'Please provide years of experience'],
//     min: 0,
//   },
//   hourlyRate: {
//     type: Number,
//     required: [true, 'Please set an hourly rate'],
//   },
//   location: {
//     type: String,
//     required: [true, 'Please provide a location'],
//   },
//   image: {
//     type: String,
//     default: null,   // ✅ was: required: [true, 'Please provide an image URL']
//   },

  // --- NEW FIELDS START HERE ---
  availability: {
    type: String,
    default: 'Available',
  },
  serviceArea: {
    type: String, // e.g., "20 mile radius"
    default: 'Not specified',
  },
  credentials: {
    governmentIdVerified: { type: Boolean, default: false },
    backgroundCheckCompleted: { type: Boolean, default: false },
    licensedProfessional: { type: Boolean, default: false },
    liabilityInsurance: { type: Boolean, default: false },
  },
  servicesOffered: [
    {
      name: String,
      description: String,
      price: Number,
      tier: String, // e.g., 'Most Popular', 'Premium'
    },
  ],
  // --- NEW FIELDS END HERE ---
}, {
  timestamps: true,
});

const ProviderProfile = mongoose.model('ProviderProfile', providerProfileSchema);

module.exports = ProviderProfile;

