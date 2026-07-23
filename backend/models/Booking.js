


// const mongoose = require('mongoose');

// const bookingSchema = new mongoose.Schema({
//   provider: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // ✅ Fixed line
//   customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   bookingDate: { type: Date, required: true },
//   bookingTime: { type: String, required: true },
//   status: { type: String, enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled','Rejected'], default: 'Pending' },
//   totalCost: { type: Number, required: true },
// }, { timestamps: true });

// const Booking = mongoose.model('Booking', bookingSchema);
// module.exports = Booking;




// const mongoose = require('mongoose');

// const bookingSchema = new mongoose.Schema({
//   provider: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

//   bookingDate: { type: Date, required: true },
//   bookingTime: { type: String, required: true },

//   status: {
//     type: String,
//     enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled', 'Rejected'],
//     default: 'Pending'
//   },

//   totalCost: { type: Number, required: true },

//   // -------------------- 🔵 ESCROW SYSTEM FIELDS --------------------
//   paymentId: { type: String },       // Razorpay payment ID
//   orderId: { type: String },         // Razorpay order ID

//   escrowStatus: {
//     type: String,
//     enum: ['HELD', 'RELEASED', 'REFUNDED'],  // HELD = escrow money locked
//     default: 'HELD'
//   },

//   completionOtp: { type: String },    // OTP customer gives provider
//   isCompleted: { type: Boolean, default: false },

//   isDisputed: { type: Boolean, default: false }, // Customer raised a dispute
//   //-----------------------------------------------------------------

// }, { timestamps: true });

// const Booking = mongoose.model('Booking', bookingSchema);
// module.exports = Booking;







const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  provider: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  bookingDate: { type: Date, required: true },
  bookingTime: { type: String, required: true },

  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled', 'Rejected'],
    default: 'Pending'
  },

  totalCost: { type: Number, required: true },

  // 🔵 ESCROW SYSTEM
  paymentId: { type: String },   
  orderId: { type: String },

  escrowStatus: {
    type: String,
    enum: ['HELD', 'RELEASED', 'REFUNDED'],
    default: 'HELD'
  },

  completionOtp: { type: String },  // OTP shown to customer
  isCompleted: { type: Boolean, default: false },

  // 🔶 DISPUTES
  isDisputed: { type: Boolean, default: false }

}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
