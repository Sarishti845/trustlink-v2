// const express = require('express');
// const router = express.Router();
// const disputeController = require('../controllers/disputeController');
// const { protect, isAdmin } = require('../middleware/authMiddleware'); // your auth middleware

// // Public (protected) endpoints

// // Create a dispute (customer)
// router.post('/', protect, disputeController.createDispute);

// // Customer: get their disputes
// router.get('/mine', protect, disputeController.getCustomerDisputes);

// // Provider: get disputes assigned to provider
// router.get('/provider/mine', protect, disputeController.getProviderDisputes);

// // Provider: respond to a dispute
// router.post('/:id/respond', protect, disputeController.providerRespond);

// // Admin routes
// router.get('/', protect, isAdmin, disputeController.getAllDisputes);
// router.get('/:id', protect, isAdmin, disputeController.getDisputeById);
// router.put('/:id/resolve', protect, isAdmin, disputeController.resolveDispute);

// module.exports = router;










const express = require('express');
const router = express.Router();
const { protect, isAdmin } = require('../middleware/authMiddleware');

const Dispute = require('../models/Dispute');
const Booking = require('../models/Booking');
const User = require('../models/User');

// -------------------------------------------------------------
// 1️⃣ CUSTOMER CREATES DISPUTE
// -------------------------------------------------------------
router.post('/', protect, async (req, res) => {
  try {
    const { bookingId, reason, description } = req.body;

    const booking = await Booking.findById(bookingId);

    if (!booking)
      return res.status(404).json({ message: "Booking not found" });

    if (booking.customer.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not authorized" });

    booking.isDisputed = true;
    booking.escrowStatus = "HELD";   // 🔒 Freeze payment release
    await booking.save();

    const dispute = new Dispute({
      booking: bookingId,
      customer: req.user._id,
      provider: booking.provider,
      reason,
      description,
      // status: "OPEN"
      status: "Pending" 
    });

    await dispute.save();

    res.json({ message: "Dispute created. Escrow frozen.", dispute });
  } catch (error) {
    console.error("Create Dispute Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});


// -------------------------------------------------------------
// 2️⃣ CUSTOMER GETS THEIR DISPUTES
// -------------------------------------------------------------
router.get('/mine', protect, async (req, res) => {
  try {
    const disputes = await Dispute.find({ customer: req.user._id })
      .populate("booking")
      .populate("provider", "name email");

    res.json(disputes);
  } catch (error) {
    console.error("Fetch customer disputes:", error);
    res.status(500).json({ message: "Server Error" });
  }
});


// -------------------------------------------------------------
// 3️⃣ PROVIDER GETS DISPUTES FILED AGAINST THEM
// -------------------------------------------------------------
router.get('/provider/mine', protect, async (req, res) => {
  try {
    const disputes = await Dispute.find({ provider: req.user._id })
      .populate("booking")
      .populate("customer", "name email");

    res.json(disputes);
  } catch (error) {
    console.error("Provider dispute error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});


// -------------------------------------------------------------
// 4️⃣ PROVIDER RESPONDS TO A DISPUTE
// -------------------------------------------------------------
router.post('/:id/respond', protect, async (req, res) => {
  try {
    const dispute = await Dispute.findById(req.params.id);

    if (!dispute) return res.status(404).json({ message: "Dispute not found" });

    if (dispute.provider.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not authorized" });

    dispute.providerResponse = req.body.response;
    await dispute.save();

    res.json({ message: "Provider response submitted" });
  } catch (error) {
    console.error("Provider respond error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});


// -------------------------------------------------------------
// 5️⃣ ADMIN - VIEW ALL DISPUTES
// -------------------------------------------------------------
router.get('/', protect, isAdmin, async (req, res) => {
  try {
    const disputes = await Dispute.find()
      .populate("booking")
      .populate("provider", "name")
      .populate("customer", "name");

    res.json(disputes);
  } catch (error) {
    console.error("Admin fetch disputes:", error);
    res.status(500).json({ message: "Server Error" });
  }
});


// -------------------------------------------------------------
// 6️⃣ ADMIN - GET SPECIFIC DISPUTE
// -------------------------------------------------------------
router.get('/:id', protect, isAdmin, async (req, res) => {
  try {
    const dispute = await Dispute.findById(req.params.id)
      .populate("booking")
      .populate("provider", "name email")
      .populate("customer", "name email");

    res.json(dispute);
  } catch (error) {
    console.error("Admin get dispute error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});


// -------------------------------------------------------------
// 7️⃣ ADMIN RESOLVES DISPUTE
// -------------------------------------------------------------
// admin sends: { action: "RELEASE" }   → release to provider
//              { action: "REFUND" }    → refund customer
// router.put('/:id/resolve', protect, isAdmin, async (req, res) => {
//   try {
//     const { action } = req.body;
//     const dispute = await Dispute.findById(req.params.id);

//     if (!dispute)
//       return res.status(404).json({ message: "Dispute not found" });

//     const booking = await Booking.findById(dispute.booking);

//     if (!booking)
//       return res.status(404).json({ message: "Booking not found" });

//     // ------------------ ACTION CASES ------------------
//     if (action === "RELEASE") {
//       booking.escrowStatus = "RELEASED";
//       dispute.status = "RESOLVED_PROVIDER_WINS";
//     } else if (action === "REFUND") {
//       booking.escrowStatus = "REFUNDED";
//       dispute.status = "RESOLVED_CUSTOMER_WINS";
//     } else {
//       return res.status(400).json({ message: "Invalid action" });
//     }

//     booking.isDisputed = false;
//     await booking.save();
//     await dispute.save();

//     res.json({ message: "Dispute resolved", dispute, booking });

//   } catch (error) {
//     console.error("Admin resolve error:", error);
//     res.status(500).json({ message: "Server Error" });
//   }
// });



router.put('/:id/resolve', protect, isAdmin, async (req, res) => {
  try {
    const { decision, notes } = req.body;

    const dispute = await Dispute.findById(req.params.id);
    if (!dispute)
      return res.status(404).json({ message: "Dispute not found" });

    const booking = await Booking.findById(dispute.booking);
    if (!booking)
      return res.status(404).json({ message: "Booking not found" });

    //------------------ Updated Logic ------------------//
    if (decision === "Refund") {
      booking.escrowStatus = "REFUNDED";
      dispute.status = "Resolved";
    } 
    else if (decision === "NoAction") {
      booking.escrowStatus = "RELEASED";
      dispute.status = "Resolved";
    } 
    else {
      return res.status(400).json({ message: "Invalid decision" });
    }

    // admin notes
    dispute.adminDecision = {
      decision,
      notes,
      decidedBy: req.user._id,
      decidedAt: Date.now()
    };

    booking.isDisputed = false;

    await booking.save();
    await dispute.save();

    res.json({ message: "Dispute resolved", dispute, booking });

  } catch (error) {
    console.error("Admin resolve error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});


module.exports = router;
