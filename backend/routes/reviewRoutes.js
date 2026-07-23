const express = require("express");
const mongoose = require("mongoose");
const Review = require("../models/reviewModel.js");



const router = express.Router();

// ✅ POST: Add new review
router.post("/", async (req, res) => {
  try {
    const { userId, providerId, rating, comment } = req.body;

    if (!userId || !providerId || !rating) {
      return res.status(400).json({ success: false, error: "Missing required fields" });
    }

    const newReview = new Review({
      user: userId,
      provider: providerId,
      rating,
      comment,
    });

    await newReview.save();
    res.status(201).json({ success: true, message: "Review added successfully!" });
  } catch (error) {
    console.error("❌ Error saving review:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});






// // ✅ POST: Add new review (only for logged-in users)
// router.post("/", protect, async (req, res) => {
//   try {
//     const { providerId, rating, comment } = req.body;

//     // Validate input
//     if (!providerId || !rating) {
//       return res.status(400).json({ success: false, error: "Missing required fields" });
//     }

//     // Create new review using logged-in user info
//     const newReview = new Review({
//       user: req.user._id,       // ✅ logged-in customer's ID
//       provider: providerId,     // provider being reviewed
//       rating,
//       comment,
//     });

//     await newReview.save();
//     res.status(201).json({
//       success: true,
//       message: "Review added successfully!",
//       review: newReview,
//     });
//   } catch (error) {
//     console.error("❌ Error saving review:", error);
//     res.status(500).json({ success: false, error: "Internal server error" });
//   }
// });


// ✅ GET: Get all reviews for a provider
router.get("/:providerId", async (req, res) => {
  try {
    const reviews = await Review.find({ provider: req.params.providerId })
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, reviews });
  } catch (error) {
    console.error("❌ Error fetching reviews:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// ✅ GET: Average rating & total reviews summary
router.get("/:providerId/summary", async (req, res) => {
  try {
    const providerId = req.params.providerId;

    const stats = await Review.aggregate([
      { $match: { provider: new mongoose.Types.ObjectId(providerId) } },
      {
        $group: {
          _id: "$provider",
          avgRating: { $avg: "$rating" },
          totalReviews: { $sum: 1 },
        },
      },
    ]);

    if (!stats.length) {
      return res.json({ avgRating: 0, totalReviews: 0 });
    }

    res.json({
      avgRating: stats[0].avgRating.toFixed(1),
      totalReviews: stats[0].totalReviews,
    });
  } catch (error) {
    console.error("❌ Error fetching rating summary:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ✅ DELETE (optional for admin)
router.delete("/:id", async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Review deleted successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, error: "Error deleting review" });
  }
});

module.exports = router;
