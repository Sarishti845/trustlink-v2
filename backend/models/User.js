const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Every email must be unique
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['customer', 'provider' , 'admin'], // Role must be one of these two
    default: 'customer',
  },
  isVerified: {
    type: Boolean, // For the provider verification badge
    default: false,
  },
}, {
  timestamps: true, // Automatically adds 'createdAt' and 'updatedAt' fields
});



// Virtual populate for ProviderProfile
userSchema.virtual('providerProfile', {
  ref: 'ProviderProfile', // The model to use
  localField: '_id',     // Find ProviderProfile where localField (_id)
  foreignField: 'user', // is equal to foreignField (user)
  justOne: true         // We only expect one profile per user
});

// Ensure virtual fields are included when converting to JSON
userSchema.set('toJSON', { virtuals: true });
userSchema.set('toObject', { virtuals: true });
const User = mongoose.model('User', userSchema);

module.exports = User;