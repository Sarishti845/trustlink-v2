const Dispute = require('../models/Dispute');
const Booking = require('../models/Booking'); // optional - your project already has a Booking model
const User = require('../models/User');

// Create a dispute (customer)
exports.createDispute = async (req, res) => {
  try {
    const { bookingId, providerId, reason, attachments } = req.body;

    if (!reason) {
      return res.status(400).json({ message: 'Reason is required' });
    }

    // If bookingId provided, optional validation
    let booking = null;
    if (bookingId) {
      booking = await Booking.findById(bookingId);
      if (!booking) {
        return res.status(404).json({ message: 'Booking not found' });
      }
    }

    const dispute = new Dispute({
      booking: booking ? booking._id : undefined,
      customer: req.user._id,
      provider: providerId || (booking ? booking.provider : undefined),
      reason,
      attachments: attachments || [],
    });

    const created = await dispute.save();
    return res.status(201).json(created);
  } catch (err) {
    console.error('createDispute error', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Provider adds a response to dispute
exports.providerRespond = async (req, res) => {
  try {
    const disputeId = req.params.id;
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ message: 'Response message is required' });
    }

    const dispute = await Dispute.findById(disputeId);
    if (!dispute) {
      return res.status(404).json({ message: 'Dispute not found' });
    }

    // Ensure provider is the one responding (or admin can also respond)
    // If a provider is assigned in dispute.provider, check that
    if (dispute.provider && dispute.provider.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to respond to this dispute' });
    }

    dispute.providerResponses.push({
      responder: req.user._id,
      message,
    });

    // update status to Responded or UnderReview (depends on flow)
    dispute.status = 'Responded';

    await dispute.save();

    return res.json(dispute);
  } catch (err) {
    console.error('providerRespond error', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Admin: list all disputes (with optional filters)
exports.getAllDisputes = async (req, res) => {
  try {
    // Optionally add query params: status, customerId, providerId
    const filter = {};
    const { status, customerId, providerId } = req.query;
    if (status) filter.status = status;
    if (customerId) filter.customer = customerId;
    if (providerId) filter.provider = providerId;

    const disputes = await Dispute.find(filter)
      .populate('customer', 'name email')
      .populate('provider', 'name email')
      .populate('providerResponses.responder', 'name email')
      .populate('adminDecision.decidedBy', 'name email')
      .sort({ createdAt: -1 });

    return res.json(disputes);
  } catch (err) {
    console.error('getAllDisputes error', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Admin: get dispute by id
exports.getDisputeById = async (req, res) => {
  try {
    const dispute = await Dispute.findById(req.params.id)
      .populate('customer', 'name email')
      .populate('provider', 'name email')
      .populate('providerResponses.responder', 'name email')
      .populate('adminDecision.decidedBy', 'name email');

    if (!dispute) return res.status(404).json({ message: 'Dispute not found' });

    return res.json(dispute);
  } catch (err) {
    console.error('getDisputeById error', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Admin: resolve dispute
exports.resolveDispute = async (req, res) => {
  try {
    const { decision, notes } = req.body;
    const dispute = await Dispute.findById(req.params.id);
    if (!dispute) return res.status(404).json({ message: 'Dispute not found' });

    dispute.adminDecision = {
      decision: decision || 'Other',
      notes: notes || '',
      decidedBy: req.user._id,
      decidedAt: Date.now(),
    };

    dispute.status = 'Resolved';
    await dispute.save();

    // Optionally: apply side effects like issuing refund, marking booking etc.
    return res.json(dispute);
  } catch (err) {
    console.error('resolveDispute error', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Customer: list their disputes
exports.getCustomerDisputes = async (req, res) => {
  try {
    const disputes = await Dispute.find({ customer: req.user._id })
      .populate('provider', 'name email')
      .sort({ createdAt: -1 });
    return res.json(disputes);
  } catch (err) {
    console.error('getCustomerDisputes error', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Provider: list disputes assigned to provider
exports.getProviderDisputes = async (req, res) => {
  try {
    const disputes = await Dispute.find({ provider: req.user._id })
      .populate('customer', 'name email')
      .sort({ createdAt: -1 });
    return res.json(disputes);
  } catch (err) {
    console.error('getProviderDisputes error', err);
    return res.status(500).json({ message: 'Server error' });
  }
};
