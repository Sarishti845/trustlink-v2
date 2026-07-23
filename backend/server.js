
// const express = require('express');
// const dotenv = require('dotenv');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const userRoutes = require('./routes/userRoutes.js');
// const providerRoutes = require('./routes/providerRoutes.js'); // 1. Import provider routes
// const bookingRoutes = require('./routes/bookingRoutes.js'); // 1. Import booking routes

// dotenv.config();
// const app = express();
// const PORT = 5000;

// app.use(cors());
// app.use(express.json());

// mongoose.connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log('Successfully connected to MongoDB!');
//     app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));
//   })
//   .catch((error) => console.error('MongoDB connection error:', error.message));

// // --- API Routes ---
// app.use('/api/users', userRoutes);
// app.use('/api/providers', providerRoutes); // 2. Add provider routes
// // --- API
// app.use('/api/bookings', bookingRoutes); // 2. Add booking routes


// const chatRoutes = require("./routes/chatRoutes.js");
// app.use("/api/chat", chatRoutes);










const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require('path');

const userRoutes = require("./routes/userRoutes.js");
const providerRoutes = require("./routes/providerRoutes.js");
const bookingRoutes = require("./routes/bookingRoutes.js");
const chatRoutes = require("./routes/chatRoutes.js"); // ✅ Import chat route
const reviewRoutes = require("./routes/reviewRoutes.js");
const adminRoutes = require('./routes/adminRoutes.js');
const disputeRoutes = require('./routes/disputeRoutes');
const paymentRoutes = require("./routes/paymentRoutes");

// const reviewRoutes = require('./routes/reviewRoutes.js');
// const reviewRoutes = require('./routes/reviewRoutes.js');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Register routes BEFORE starting the server
// Make uploads folder static
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.use("/api/users", userRoutes);
app.use("/api/providers", providerRoutes);
app.use("/api/bookings", bookingRoutes);
// app.use('/api/providers/:providerId/reviews', reviewRoutes);
app.use("/api/chat", chatRoutes); // ✅ Make sure this line is ABOVE app.listen()
console.log("✅ Chat route registered at /api/chat"); 
app.use("/api/reviews", reviewRoutes);
console.log("✅ Review route registered at /api/reviews");
app.use('/api/admin', adminRoutes);
// app.use("/uploads", express.static("uploads"));
app.use('/api/disputes', disputeRoutes);

app.use("/api/payment", paymentRoutes);


// Connect to MongoDB and then start the server
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ Successfully connected to MongoDB!");
    app.listen(PORT, () =>
      console.log(`🚀 Server running at http://localhost:${PORT}`)
    );
  })
  .catch((error) => {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1); // fail fast so the host (e.g. Render) reports the real cause
  });
