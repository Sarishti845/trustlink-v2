const express = require('express');
const router = express.Router();
const ProviderProfile = require('../models/ProviderProfile.js');
const User = require('../models/User.js');
const { protect } = require('../middleware/authMiddleware.js');
const upload = require('../uploadConfig.js');
const { 
  getProviders, 
  getProviderById, 
  updateProvider, 
  deleteProvider,
  getMyProfile 
} = require("../controllers/providerController.js");





const {
  getMyJobs,
  confirmBooking,
  completeBooking,
  getProviderEarnings,
  rejectBooking,
} = require("../controllers/providerController.js");

// ===============================
// PROVIDER DASHBOARD ROUTES
// ===============================
router.get("/my-jobs", protect, getMyJobs);
router.put("/confirm/:id", protect, confirmBooking);
router.put("/complete/:id", protect, completeBooking);
router.get("/me", protect, getMyProfile);
router.put("/reject/:id", protect, rejectBooking);
router.get("/earnings", protect, getProviderEarnings);


// --- UPDATED ROUTE ---
// @desc    Get all verified provider profiles (with filtering)
// @route   GET /api/providers
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { search, sort, price } = req.query;

    // 1. Find all User documents that are verified providers
    const verifiedProviderUsers = await User.find({ role: 'provider', isVerified: true }).select('_id');

    // 2. Extract just the IDs from these user documents
    const verifiedProviderUserIds = verifiedProviderUsers.map(user => user._id);

    // 3. Create a base filter for profiles belonging to verified users
    let query = ProviderProfile.find({ user: { $in: verifiedProviderUserIds } });

    // 4. Add Price Filter to the query
    if (price) {
      if (price === '0-50') {
        query = query.where('hourlyRate').gte(0).lte(50);
      } else if (price === '50-100') {
        query = query.where('hourlyRate').gte(50).lte(100);
      } else if (price === '100+') {
        query = query.where('hourlyRate').gte(100);
      }
    }

    // 5. Add Sort Options to the query
    let sortOptions = {};
    if (sort === 'priceLowHigh') {
      sortOptions = { hourlyRate: 1 }; // 1 for ascending
    } else if (sort === 'priceHighLow') {
      sortOptions = { hourlyRate: -1 }; // -1 for descending
    } else if (sort === 'mostExperienced') {
      sortOptions = { experience: -1 };
    } else {
      sortOptions = { createdAt: -1 }; // Default sort
    }
    query = query.sort(sortOptions);

    // 6. Populate the user data (name, email, etc.)
    query = query.populate('user', 'name email isVerified');

    // 7. Execute the query
    let profiles = await query;

    // 8. Add Search Filter (running on the populated results)
    // This runs after fetching, so it can search populated user names
    if (search) {
      const searchRegex = new RegExp(search, 'i'); // 'i' for case-insensitive
      profiles = profiles.filter(profile => 
        (profile.user && profile.user.name.match(searchRegex)) ||
        profile.serviceCategory.match(searchRegex) ||
        profile.bio.match(searchRegex)
      );
    }

    res.json(profiles);
  } catch (error) {
    console.error(`Error fetching verified providers: ${error.message}`);
    res.status(500).json({ message: 'Server Error' });
  }
});


// @desc    Apply to become a provider / Update profile
// @route   POST /api/providers/apply
// @access  Private
router.post('/apply', protect, (req, res) => {
  upload(req, res, async (err) => {
    // ... (Your existing /apply code remains here) ...
    // (No changes needed to this route)
    if (err) {
        console.error("Multer error:", err);
        return res.status(400).json({ message: err.message || err });
    }
    if (!req.files || !req.files.idProof || !req.files.license) {
       return res.status(400).json({ message: 'Both ID proof and license files are required.' });
    }
    try {
        const { serviceCategory, experience, hourlyRate, location, serviceArea, bio } = req.body;
        if (!serviceCategory || !experience || !hourlyRate || !location || !bio) {
            return res.status(400).json({ message: 'Please fill in all required fields.' });
        }
        const idProofPath = req.files.idProof[0].path;
        const licensePath = req.files.license[0].path;
        let profile = await ProviderProfile.findOne({ user: req.user._id });

        if (profile) { // Update existing profile
            profile.serviceCategory = serviceCategory;
            profile.experience = experience;
            profile.hourlyRate = hourlyRate;
            profile.location = location;
            profile.serviceArea = serviceArea || profile.serviceArea;
            profile.bio = bio;
            profile.idProofPath = idProofPath;
            profile.licensePath = licensePath;
             if (!profile.image) {
                profile.image = "https://via.placeholder.com/350x200?text=No+Image";
            }
        } else { // Create new profile
            profile = new ProviderProfile({
                user: req.user._id,
                serviceCategory,
                experience,
                hourlyRate,
                location,
                serviceArea,
                bio,
                idProofPath,
                licensePath,
                image: "https://via.placeholder.com/350x200?text=No+Image"
            });
        }
        await profile.save();

        const user = await User.findById(req.user._id);
        if (user && user.role !== 'provider' && user.role !== 'admin') {
            user.role = 'provider';
            user.isVerified = false; // Ensure new applicants are not verified
            await user.save();
        }
        res.status(201).json({ message: 'Application submitted successfully. Awaiting verification.' });
    } catch (error) {
        console.error(`Error processing provider application: ${error.message}`);
        res.status(500).json({ message: 'Server Error' });
    }
  });
});


// @desc    Fetch a single provider profile
// @route   GET /api/providers/:id
router.get('/:id', async (req, res) => {
  try {
    const profile = await ProviderProfile.findById(req.params.id).populate('user', 'name email isVerified');
    if (profile) {
      res.json(profile);
    } else {
      res.status(404).json({ message: 'Provider not found' });
    }
  } catch (error) {
    console.error(`Error fetching single provider: ${error.message}`);
    res.status(500).json({ message: 'Server Error' });
  }
});


router.put("/me", protect, async (req, res) => {
  try {
    const profile = await ProviderProfile.findOne({ user: req.user._id });

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    // Update allowed fields
    profile.serviceCategory = req.body.serviceCategory || profile.serviceCategory;
    profile.hourlyRate = req.body.hourlyRate || profile.hourlyRate;
    profile.bio = req.body.bio || profile.bio;

    await profile.save();

    res.json({ message: "Profile updated successfully", profile });

  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Server error updating profile" });
  }
});





module.exports = router;








// const express = require("express");
// const multer = require("multer");
// const path = require("path");
// const fs = require("fs");
// const ProviderProfile = require("../models/ProviderProfile.js");

// const router = express.Router();

// // ========== MULTER SETUP ==========
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const uploadDir = path.join(__dirname, "../uploads");
//     if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
//     cb(null, uploadDir);
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// const upload = multer({ storage });

// // ========== POST /api/providers/verify ==========
// router.post(
//   "/verify",
//   upload.fields([
//     { name: "idProof", maxCount: 1 },
//     { name: "license", maxCount: 1 },
//   ]),
//   async (req, res) => {
//     try {
//       const { serviceCategory, experience, hourlyRate, location, serviceArea, bio } = req.body;

//       const idProof = req.files?.idProof?.[0]?.path || null;
//       const license = req.files?.license?.[0]?.path || null;

//       const newProfile = new ProviderProfile({
//         serviceCategory,
//         experience,
//         hourlyRate,
//         location,
//         serviceArea,
//         bio,
//         idProof,
//         license,
//         verificationStatus: "Pending",
//         createdAt: new Date(),
//       });

//       await newProfile.save();

//       res.status(201).json({ message: "Application submitted successfully!" });
//     } catch (error) {
//       console.error("Error verifying provider:", error);
//       res.status(500).json({ message: "Server error while verifying provider" });
//     }
//   }
// );

// // ========== EXISTING ROUTES ==========
// router.get("/", async (req, res) => {
//   try {
//     const profiles = await ProviderProfile.find({}).populate("user", "name email isVerified");
//     res.json(profiles);
//   } catch (error) {
//     res.status(500).json({ message: "Server Error" });
//   }
// });

// router.get("/:id", async (req, res) => {
//   try {
//     const profile = await ProviderProfile.findById(req.params.id).populate("user", "name email isVerified");
//     if (profile) {
//       res.json(profile);
//     } else {
//       res.status(404).json({ message: "Provider not found" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: "Server Error" });
//   }
// });

// module.exports = router;
