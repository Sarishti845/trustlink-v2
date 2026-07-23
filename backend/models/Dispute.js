const mongoose = require('mongoose');

const disputeSchema = new mongoose.Schema(
  {
    // Link to booking/job if you have Booking model
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Booking',
      required: false,
    },

    // who raised the dispute (customer)
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    // provider involved (optional if known from booking)
    provider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },

    // short reason / description
    reason: {
      type: String,
      required: true,
      trim: true,
    },

    // provider's official response (array to keep history)
    providerResponses: [
      {
        responder: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        message: { type: String },
        createdAt: { type: Date, default: Date.now },
      },
    ],

    // admin decision and notes
    adminDecision: {
      decision: { type: String, enum: ['Pending', 'Refund', 'NoAction', 'PartialRefund', 'Other'], default: 'Pending' },
      notes: { type: String },
      decidedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      decidedAt: { type: Date },
    },

    // status: Pending (new), Responded (provider replied), UnderReview (admin looking), Resolved
    status: {
      type: String,
      enum: ['Pending', 'Responded', 'UnderReview', 'Resolved'],
      default: 'Pending',
    },

    // optional attachments (paths/urls)
    attachments: [{ type: String }],

  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Dispute', disputeSchema);
