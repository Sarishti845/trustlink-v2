const express = require("express");
const router = express.Router();

const Booking = require("../models/Booking");
const User = require("../models/User");

const { protect, protectProvider, isAdmin } =
  require("../middleware/authMiddleware");

// Create Booking (after payment)
router.post("/", protect, async (req, res) => {
  try {
    const {
      provider,
      bookingDate,
      bookingTime,
      totalCost,
      paymentId,
      orderId,
    } = req.body;

    if (!provider)
      return res.status(400).json({ message: "Provider ID is required" });

    const providerUser = await User.findById(provider);
    if (!providerUser || providerUser.role !== "provider")
      return res.status(404).json({ message: "Invalid provider ID" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const booking = await Booking.create({
      provider: providerUser._id,
      customer: req.user._id,
      bookingDate,
      bookingTime,
      totalCost,
      paymentId,
      orderId,
      escrowStatus: "HELD",
      completionOtp: otp,
    });

    res.status(201).json(booking);
  } catch (error) {
    console.error("Create booking error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Get customer’s bookings
router.get("/mybookings", protect, async (req, res) => {
  try {
    const bookings = await Booking.find({ customer: req.user._id })
      .select(
        "provider bookingDate bookingTime status totalCost completionOtp escrowStatus"
      )
      .populate("provider", "name email")
      .sort({ createdAt: -1 });

    res.json({ bookings });
  } catch (error) {
    console.error("My bookings error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Cancel booking
router.put("/cancel/:id", protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking)
      return res.status(404).json({ message: "Booking not found" });

    if (booking.customer.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not authorized" });

    if (["Confirmed", "Completed"].includes(booking.status))
      return res.status(400).json({ message: "Cannot cancel this booking" });

    booking.status = "Cancelled";
    await booking.save();

    res.json({ message: "Booking cancelled", booking });
  } catch (error) {
    console.error("Cancel booking error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Provider verifies OTP
router.post("/:id/verify-otp", protectProvider, async (req, res) => {
  try {
    const { otp } = req.body;
    const booking = await Booking.findById(req.params.id);

    if (!booking)
      return res.status(404).json({ message: "Booking not found" });

    if (booking.provider.toString() !== req.user._id.toString())
      return res.status(401).json({ message: "Not your booking" });

    if (booking.completionOtp !== otp)
      return res.status(400).json({ message: "Invalid OTP" });

    booking.isCompleted = true;
    booking.escrowStatus = "RELEASED";
    booking.status = "Completed";

    await booking.save();

    res.json({ message: "OTP verified — Payment released!" });
  } catch (error) {
    console.error("OTP verify error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// // Admin Release Escrow
// router.post("/admin/release/:id", protectAdmin, async (req, res) => {
//   try {
//     const booking = await Booking.findById(req.params.id);

//     if (!booking)
//       return res.status(404).json({ message: "Booking not found" });

//     booking.escrowStatus = "RELEASED";
//     booking.isDisputed = false;

//     await booking.save();

//     res.json({ message: "Escrow released to provider." });
//   } catch (err) {
//     console.error("Admin release error:", err);
//     res.status(500).json({ message: "Server Error" });
//   }
// });


// -----------------------------------------------------------
// ADMIN — release escrow
// -----------------------------------------------------------
router.post("/admin/release/:id", protect, isAdmin, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking)
      return res.status(404).json({ message: "Booking not found" });

    booking.escrowStatus = "RELEASED";
    booking.isDisputed = false;

    await booking.save();

    res.json({ message: "Escrow released to provider." });
  } catch (err) {
    console.error("Admin release error:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

// // Admin Refund Customer
// router.post("/admin/refund/:id", protectAdmin, async (req, res) => {
//   try {
//     const booking = await Booking.findById(req.params.id);

//     if (!booking)
//       return res.status(404).json({ message: "Booking not found" });

//     booking.escrowStatus = "REFUNDED";
//     booking.isDisputed = false;

//     await booking.save();

//     res.json({ message: "Customer refunded." });
//   } catch (err) {
//     console.error("Admin refund error:", err);
//     res.status(500).json({ message: "Server Error" });
//   }
// });







// -----------------------------------------------------------
// ADMIN — refund customer
// -----------------------------------------------------------
router.post("/admin/refund/:id", protect, isAdmin, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking)
      return res.status(404).json({ message: "Booking not found" });

    booking.escrowStatus = "REFUNDED";
    booking.isDisputed = false;

    await booking.save();

    res.json({ message: "Customer refunded." });
  } catch (err) {
    console.error("Admin refund error:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
