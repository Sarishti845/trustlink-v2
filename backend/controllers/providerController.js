const Booking = require("../models/Booking");
const User = require("../models/User");
const ProviderProfile = require("../models/ProviderProfile.js");


// ✅ Get all bookings assigned to this provider
// exports.getMyJobs = async (req, res) => {
//   try {
//     const providerId = req.user._id;

//     // Fetch bookings assigned to the logged-in provider
//     const bookings = await Booking.find({ provider: providerId })
//       .populate("user", "name email")
//       .sort({ createdAt: -1 });

//     if (!bookings.length) {
//       return res.status(200).json({ message: "No bookings found.", bookings: [] });
//     }

//     res.status(200).json({ bookings });
//   } catch (error) {
//     console.error("Error fetching provider jobs:", error);
//     res.status(500).json({ message: "Server Error" });
//   }
// };
// ✅ Get all bookings assigned to this provider
exports.getMyJobs = async (req, res) => {
  try {
    const providerId = req.user._id;

    // Fetch bookings assigned to the logged-in provider
    const bookings = await Booking.find({ provider: providerId })
      .populate("customer", "name email")   // ✅ customer exists in Booking schema
      .populate("provider", "name email")   // ✅ provider exists in Booking schema
      .sort({ createdAt: -1 });

    if (!bookings.length) {
      return res.status(200).json({ message: "No bookings found.", bookings: [] });
    }

    res.status(200).json({ bookings });
  } catch (error) {
    console.error("Error fetching provider jobs:", error);
    res.status(500).json({ message: "Server Error" });
  }
};


// ✅ Confirm a booking (accept job)
exports.confirmBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.status = "Confirmed";
    await booking.save();

    res.status(200).json({ message: "Booking confirmed successfully." });
  } catch (error) {
    console.error("Error confirming booking:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ✅ Complete a booking
// exports.completeBooking = async (req, res) => {
//   try {
//     const booking = await Booking.findById(req.params.id);
//     if (!booking) {
//       return res.status(404).json({ message: "Booking not found" });
//     }

//     booking.status = "Completed";
//     booking.completedAt = Date.now();
//     await booking.save();

//     res.status(200).json({ message: "Booking marked as completed." });
//   } catch (error) {
//     console.error("Error completing booking:", error);
//     res.status(500).json({ message: "Server Error" });
//   }
// };



exports.completeBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("provider", "user")
      .populate("customer", "name email");

    if (!booking) return res.status(404).json({ message: "Booking not found" });

    booking.status = "Completed";
    await booking.save();

    // update provider earnings
    const provider = await ProviderProfile.findById(booking.provider);
    if (provider) {
      provider.totalEarnings =
        (provider.totalEarnings || 0) + (booking.totalCost || 0);
      await provider.save();
    }

    res.json({ message: "Booking marked as completed", booking });
  } catch (error) {
    console.error("Error completing booking:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// ✅ Reject a booking
exports.rejectBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.status = "Rejected";
    await booking.save();

    res.json({
      message: "Booking rejected successfully",
      booking,
    });
  } catch (error) {
    console.error("❌ Error rejecting booking:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// ✅ Get provider’s earnings summary
exports.getEarnings = async (req, res) => {
  try {
    const providerId = req.user._id;

    const completedBookings = await Booking.find({
      provider: providerId,
      status: "Completed",
    });

    const totalEarnings = completedBookings.reduce(
      (sum, b) => sum + (b.amount || 0),
      0
    );

    const pendingBookings = await Booking.countDocuments({
      provider: providerId,
      status: "Confirmed",
    });

    res.status(200).json({
      totalEarnings,
      completedJobs: completedBookings.length,
      pendingJobs: pendingBookings,
    });
  } catch (error) {
    console.error("Error fetching provider earnings:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// exports.getMyProfile = async (req, res) => {
//   try {
//     const provider = await ProviderProfile.findOne({ user: req.user._id })
//       .populate("user", "name email");
//     if (!provider) {
//       return res.status(404).json({ message: "Provider profile not found" });
//     }
//     res.json(provider);
//   } catch (error) {
//     console.error("Error fetching provider profile:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// ✅ Get provider profile of logged-in user
exports.getMyProfile = async (req, res) => {
  try {
    console.log("👉 Logged-in user ID:", req.user._id);

    // Find provider profile linked to the logged-in user
    const provider = await ProviderProfile.findOne({ user: req.user._id })
      .populate("user", "name email");

    if (!provider) {
      console.log("❌ Provider profile not found for user:", req.user._id);
      return res.status(404).json({ message: "Provider profile not found" });
    }

    console.log("✅ Provider profile found:", provider._id);
    res.status(200).json(provider);
  } catch (error) {
    console.error("Error fetching provider profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.rejectBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    booking.status = "Rejected";
    await booking.save();
    res.json({ message: "Booking rejected successfully", booking });
  } catch (error) {
    console.error("Error rejecting booking:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// ✅ Get Provider Earnings Summary
// ✅ Get Provider Earnings
// exports.getProviderEarnings = async (req, res) => {
//   try {
//     const providerId = req.user._id;

//     // 1️⃣ Fetch all bookings for this provider
//     const bookings = await Booking.find({ provider: providerId });

//     // 2️⃣ Filter based on status
//     const completedJobs = bookings.filter((b) => b.status === "Completed");
//     const pendingJobs = bookings.filter((b) => b.status === "Pending");

//     // 3️⃣ Calculate total earnings
//     // const totalEarnings = completedJobs.reduce(
//     //   (sum, job) => sum + (job.totalCost || 0),
//     //   0
//     // );
//    const totalEarnings = completedBookings.reduce(
//   (sum, b) => sum + (b.totalCost || 0),
//   0
// );

//     console.log("💰 Calculated earnings:", totalEarnings);

//     // 4️⃣ Send back summary
//     res.json({
//       totalEarnings,
//       completedJobs: completedJobs.length,
//       pendingJobs: pendingJobs.length,
//     });
//   } catch (error) {
//     console.error("❌ Error fetching provider earnings:", error);
//     res.status(500).json({ message: "Server error fetching earnings" });
//   }
// };

exports.getProviderEarnings = async (req, res) => {
  try {
    const providerId = req.user._id;

    const completedBookings = await Booking.find({
      provider: providerId,
      status: "Completed",
    });

    const pendingBookings = await Booking.countDocuments({
      provider: providerId,
      status: "Pending",
    });

    const totalEarnings = completedBookings.reduce(
      (sum, b) => sum + (b.totalCost || 0),
      0
    );

    res.status(200).json({
      totalEarnings,
      completedJobs: completedBookings.length,
      pendingJobs: pendingBookings,
    });
  } catch (error) {
    console.error("Error fetching provider earnings:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
