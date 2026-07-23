// const express = require('express');
// const router = express.Router();
// const User = require('../models/User.js');
// const { protect, isAdmin } = require('../middleware/authMiddleware.js'); // Import protect and isAdmin

// // @desc    Get all pending (unverified) providers
// // @route   GET /api/admin/pending-providers
// // @access  Private/Admin
// // router.get('/pending-providers', protect, isAdmin, async (req, res) => {
// //   try {
// //     const pendingProviders = await User.find({ role: 'provider', isVerified: false })
// //                                      .select('name email createdAt'); // Select only needed fields
// //     res.json(pendingProviders);
// //   } catch (error) {
// //     console.error(`Error fetching pending providers: ${error.message}`);
// //     res.status(500).json({ message: 'Server Error' });
// //   }
// // });
// // @desc    Get all pending (unverified) providers with profile details
// // @route   GET /api/admin/pending-providers
// // @access  Private/Admin
// router.get('/pending-providers', protect, isAdmin, async (req, res) => {
//   try {
//     // Find pending users and populate their virtual providerProfile field
//     const pendingProviders = await User.find({ role: 'provider', isVerified: false })
//                                      .select('name email createdAt') // Select desired User fields
//                                      .populate({ // Populate the virtual field
//                                         path: 'providerProfile',
//                                         select: 'serviceCategory experience bio idProofPath licensePath' // Select desired Profile fields
//                                      });
//     res.json(pendingProviders);
//   } catch (error) {
//     console.error(`Error fetching pending providers: ${error.message}`);
//     res.status(500).json({ message: 'Server Error' });
//   }
// });

// // @desc    Verify a provider
// // @route   PUT /api/admin/providers/:userId/verify
// // @access  Private/Admin
// router.put('/providers/:userId/verify', protect, isAdmin, async (req, res) => {
//   try {
//     const provider = await User.findById(req.params.userId);

//     if (provider && provider.role === 'provider') {
//       provider.isVerified = true;
//       const updatedProvider = await provider.save();
//       res.json({
//         _id: updatedProvider._id,
//         name: updatedProvider.name,
//         isVerified: updatedProvider.isVerified,
//       });
//     } else {
//       res.status(404).json({ message: 'Provider not found' });
//     }
//   } catch (error) {
//     console.error(`Error verifying provider: ${error.message}`);
//     res.status(500).json({ message: 'Server Error' });
//   }
// });

// module.exports = router;













// const express = require('express');
// const router = express.Router();
// const User = require('../models/User');
// const Booking = require('../models/Booking');
// const { protect, isAdmin } = require('../middleware/authMiddleware');

// // -------------------------------------------------------------
// // 1️⃣ ADMIN — Get pending providers
// // -------------------------------------------------------------
// router.get('/pending-providers', protect, isAdmin, async (req, res) => {
//   try {
//     const pendingProviders = await User.find({ role: 'provider', isVerified: false })
//       .select('name email createdAt')
//       .populate({
//         path: 'providerProfile',
//         select: 'serviceCategory experience bio idProofPath licensePath'
//       });

//     res.json(pendingProviders);
//   } catch (error) {
//     console.error("Admin pending providers error:", error);
//     res.status(500).json({ message: "Server Error" });
//   }
// });


// // -------------------------------------------------------------
// // 2️⃣ Verify Provider
// // -------------------------------------------------------------
// router.put('/providers/:userId/verify', protect, isAdmin, async (req, res) => {
//   try {
//     const provider = await User.findById(req.params.userId);

//     if (!provider || provider.role !== 'provider')
//       return res.status(404).json({ message: 'Provider not found' });

//     provider.isVerified = true;
//     await provider.save();

//     res.json({ message: "Provider verified", provider });
//   } catch (error) {
//     console.error("Admin provider verify error:", error);
//     res.status(500).json({ message: 'Server Error' });
//   }
// });


// // -------------------------------------------------------------
// // 3️⃣ ADMIN — Escrow Management (No dispute)
// // -------------------------------------------------------------
// router.post('/escrow/release/:bookingId', protect, isAdmin, async (req, res) => {
//   const booking = await Booking.findById(req.params.bookingId);

//   if (!booking) return res.status(404).json({ message: "Booking not found" });

//   booking.escrowStatus = "RELEASED";
//   await booking.save();

//   res.json({ message: "Escrow released manually" });
// });

// router.post('/escrow/refund/:bookingId', protect, isAdmin, async (req, res) => {
//   const booking = await Booking.findById(req.params.bookingId);

//   if (!booking) return res.status(404).json({ message: "Booking not found" });

//   booking.escrowStatus = "REFUNDED";
//   await booking.save();

//   res.json({ message: "Customer refunded manually" });
// });


// module.exports = router;









// const express = require('express');
// const router = express.Router();
// const User = require('../models/User');
// const Booking = require('../models/Booking');
// const { protect, protectAdmin } = require('../middleware/authMiddleware');

// // -------------------------------------------------------------
// // 1️⃣ ADMIN — Get pending providers
// // -------------------------------------------------------------
// router.get('/pending-providers', protect, protectAdmin, async (req, res) => {
//   try {
//     const pendingProviders = await User.find({ role: 'provider', isVerified: false })
//       .select('name email createdAt')
//       .populate({
//         path: 'providerProfile',
//         select: 'serviceCategory experience bio idProofPath licensePath'
//       });

//     res.json(pendingProviders);
//   } catch (error) {
//     console.error("Admin pending providers error:", error);
//     res.status(500).json({ message: "Server Error" });
//   }
// });

// // -------------------------------------------------------------
// // 2️⃣ Verify Provider
// // -------------------------------------------------------------
// router.put('/providers/:userId/verify', protect, protectAdmin, async (req, res) => {
//   try {
//     const provider = await User.findById(req.params.userId);

//     if (!provider || provider.role !== 'provider')
//       return res.status(404).json({ message: 'Provider not found' });

//     provider.isVerified = true;
//     await provider.save();

//     res.json({ message: "Provider verified", provider });
//   } catch (error) {
//     console.error("Admin provider verify error:", error);
//     res.status(500).json({ message: 'Server Error' });
//   }
// });

// // -------------------------------------------------------------
// // 3️⃣ ADMIN — Escrow Management
// // -------------------------------------------------------------
// router.post('/escrow/release/:bookingId', protect, protectAdmin, async (req, res) => {
//   const booking = await Booking.findById(req.params.bookingId);

//   if (!booking) return res.status(404).json({ message: "Booking not found" });

//   booking.escrowStatus = "RELEASED";
//   await booking.save();

//   res.json({ message: "Escrow released manually" });
// });

// router.post('/escrow/refund/:bookingId', protect, protectAdmin, async (req, res) => {
//   const booking = await Booking.findById(req.params.bookingId);

//   if (!booking) return res.status(404).json({ message: "Booking not found" });

//   booking.escrowStatus = "REFUNDED";
//   await booking.save();

//   res.json({ message: "Customer refunded manually" });
// });

// module.exports = router;









const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Booking = require('../models/Booking');
const { protect, isAdmin } = require('../middleware/authMiddleware');

// -------------------------------------------------------------
// 1️⃣ ADMIN — Get pending providers
// -------------------------------------------------------------
router.get('/pending-providers', protect, isAdmin, async (req, res) => {
  try {
    const pendingProviders = await User.find({ role: 'provider', isVerified: false })
      .select('name email createdAt')
      .populate({
        path: 'providerProfile',
        select: 'serviceCategory experience bio idProofPath licensePath'
      });

    res.json(pendingProviders);
  } catch (error) {
    console.error("Admin pending providers error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// -------------------------------------------------------------
// 2️⃣ Verify Provider
// -------------------------------------------------------------
router.put('/providers/:userId/verify', protect, isAdmin, async (req, res) => {
  try {
    const provider = await User.findById(req.params.userId);

    if (!provider || provider.role !== 'provider')
      return res.status(404).json({ message: 'Provider not found' });

    provider.isVerified = true;
    await provider.save();

    res.json({ message: "Provider verified", provider });
  } catch (error) {
    console.error("Admin provider verify error:", error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// -------------------------------------------------------------
// 3️⃣ ADMIN — Escrow Management
// -------------------------------------------------------------
router.post('/escrow/release/:bookingId', protect, isAdmin, async (req, res) => {
  const booking = await Booking.findById(req.params.bookingId);

  if (!booking) return res.status(404).json({ message: "Booking not found" });

  booking.escrowStatus = "RELEASED";
  await booking.save();

  res.json({ message: "Escrow released manually" });
});

router.post('/escrow/refund/:bookingId', protect, isAdmin, async (req, res) => {
  const booking = await Booking.findById(req.params.bookingId);

  if (!booking) return res.status(404).json({ message: "Booking not found" });

  booking.escrowStatus = "REFUNDED";
  await booking.save();

  res.json({ message: "Customer refunded manually" });
});

module.exports = router;
