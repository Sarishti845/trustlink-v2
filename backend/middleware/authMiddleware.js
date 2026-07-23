// const jwt = require('jsonwebtoken');
// const User = require('../models/User.js');

// const protect = async (req, res, next) => {
//   let token;

//   if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//     try {
//       // Get token from header
//       token = req.headers.authorization.split(' ')[1];

//       // Verify token
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);

//       // Get user from the token (and attach to request object)
//       req.user = await User.findById(decoded.id).select('-password');
//       next();
//     } catch (error) {
//       console.error(error);
//       res.status(401).json({ message: 'Not authorized, token failed' });
//     }
//   }

//   if (!token) {
//     res.status(401).json({ message: 'Not authorized, no token' });
//   }
// };





// // --- NEW ADMIN MIDDLEWARE ---
// const isAdmin = (req, res, next) => {
//   // 'protect' middleware should have already run and attached 'req.user'
//   if (req.user && req.user.role === 'admin') {
//     next(); // User is an admin, proceed to the next function (the route handler)
//   } else {
//     res.status(403); // 403 Forbidden status
//     throw new Error('Not authorized as an admin');
//   }
// };

// // Export both functions
// module.exports = { protect, isAdmin };

// // module.exports = { protect };






// const jwt = require('jsonwebtoken');
// const User = require('../models/User.js');

// // ---------------------
// // COMMON AUTH MIDDLEWARE
// // ---------------------
// const protect = async (req, res, next) => {
//   let token;

//   if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//     try {
//       token = req.headers.authorization.split(' ')[1];

//       const decoded = jwt.verify(token, process.env.JWT_SECRET);

//       req.user = await User.findById(decoded.id).select('-password');
//       return next();
//     } catch (error) {
//       console.error(error);
//       return res.status(401).json({ message: 'Not authorized, token failed' });
//     }
//   }

//   return res.status(401).json({ message: 'Not authorized, no token' });
// };

// // ---------------------
// // PROVIDER ONLY
// // ---------------------
// const protectProvider = (req, res, next) => {
//   if (req.user && req.user.role === "provider") return next();

//   return res.status(403).json({ message: "Not authorized as provider" });
// };

// // ---------------------
// // ADMIN ONLY
// // ---------------------
// const protectAdmin = (req, res, next) => {
//   if (req.user && req.user.role === "admin") return next();

//   return res.status(403).json({ message: "Not authorized as admin" });
// };

// // ---------------------
// module.exports = {
//   protect,
//   protectProvider,
//   protectAdmin
// };








const jwt = require('jsonwebtoken');
const User = require('../models/User.js');

// ---------------------
// COMMON AUTH MIDDLEWARE
// ---------------------
const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select('-password');
      return next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  return res.status(401).json({ message: 'Not authorized, no token' });
};

// ---------------------
// PROVIDER ONLY
// ---------------------
const protectProvider = (req, res, next) => {
  if (req.user && req.user.role === "provider") return next();

  return res.status(403).json({ message: "Not authorized as provider" });
};

// ---------------------
// ADMIN ONLY (USE THIS)
// ---------------------
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    return next();
  }
  return res.status(403).json({ message: "Not authorized as admin" });
};

module.exports = {
  protect,
  protectProvider,
  isAdmin
};
