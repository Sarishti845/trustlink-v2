# TrustLink — Local Service Finder

TrustLink is a full-stack service marketplace that connects customers with verified local service providers (plumbers, electricians, carpenters, tutors, and more). It supports provider onboarding with admin verification, service booking, secure payments, and a review/rating system.

**Live App:** https://trustlink-v2-rqt1.vercel.app
**Backend API:** https://trustlink-v2-backend.onrender.com

## 🎥 Demo Video

[Watch the full walkthrough](https://drive.google.com/file/d/1kt4Rjd7iVKZUETbLC8OG2O8t7AFJfyAS/view?usp=sharing)

## Features

### For Customers
- Browse and search verified service providers by category, price, and rating
- View detailed provider profiles with credentials, services offered, and reviews
- Book a service with date/time selection
- Secure online payments via Razorpay
- Track bookings (pending, upcoming, completed, cancelled) from a personal dashboard
- Leave ratings and reviews for completed services
- Raise and track disputes

### For Service Providers
- Apply to join as a verified provider with ID and license document upload
- Personal dashboard showing new requests, active jobs, earnings, and average rating
- Manage bookings and job status

### For Admins
- Review and approve/decline pending provider applications
- View submitted ID and license documents
- Manage disputes raised by customers

### Platform-wide
- Role-based authentication (customer / provider / admin) with JWT
- Secure password storage with bcrypt hashing
- Protected API routes with role-based authorization middleware
- Responsive UI built with React

## Tech Stack

**Frontend:** React, React Router, Axios, React Datepicker, Lucide React Icons

**Backend:** Node.js, Express.js, JWT (jsonwebtoken), bcryptjs, Multer (file uploads)

**Database:** MongoDB with Mongoose ODM

**Payments:** Razorpay

**Deployment:**
- Frontend → Vercel
- Backend → Render
- Database → MongoDB Atlas

## Architecture

```
React Frontend (Vercel)
        │
        │  HTTP requests (Axios)
        ▼
Express Backend (Render)
   ├── Routes → Controllers → Mongoose Models
   ├── JWT Auth Middleware (protect / isAdmin / protectProvider)
   └── Razorpay Order Creation
        │
        ▼
MongoDB Atlas (users, providerprofiles, bookings, reviews, disputes, chatmessages)
```

## Getting Started Locally

### Prerequisites
- Node.js (v18+ recommended)
- A MongoDB Atlas connection string
- A Razorpay account (test mode keys are fine for development)

### 1. Clone the repository
```bash
git clone https://github.com/Sarishti845/trustlink-v2.git
cd trustlink-v2
```

### 2. Backend setup
```bash
cd backend
npm install
```

Create a `.env` file in `backend/` with:
```
MONGO_URI=your_mongodb_connection_string_including_database_name
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

Run the backend:
```bash
npm start
```

### 3. Frontend setup
```bash
cd ../frontend
npm install
```

Create a `.env` file in `frontend/` with:
```
REACT_APP_API_URL=http://localhost:5000
```

Run the frontend:
```bash
npm start
```

The app will be available at `http://localhost:3000`, connecting to the backend at `http://localhost:5000`.

## Environment Variables Reference

| Variable | Where | Purpose |
|---|---|---|
| `MONGO_URI` | backend | MongoDB Atlas connection string (must include database name) |
| `JWT_SECRET` | backend | Secret key used to sign/verify JWT auth tokens |
| `RAZORPAY_KEY_ID` / `RAZORPAY_KEY_SECRET` | backend | Razorpay API credentials for creating payment orders |
| `REACT_APP_API_URL` | frontend | Base URL of the backend API the frontend calls |

## Key API Endpoints

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/api/users/register` | Register a new user | No |
| POST | `/api/users/login` | Log in and receive a JWT | No |
| GET | `/api/providers` | List all verified providers | No |
| POST | `/api/bookings` | Create a new booking | Yes |
| POST | `/api/reviews` | Submit a review for a provider | Yes |
| GET | `/api/admin/pending-providers` | List providers awaiting approval | Yes (Admin) |

## Screenshots

*Add a few screenshots from your `/mnt/user-data` uploads here — homepage, provider profile, booking flow, and admin dashboard work well.*

## Roadmap / Known Limitations

- Currency display shows `$` on some pages while Razorpay charges in `₹` — cosmetic fix pending
- International card payments are restricted in Razorpay test mode; UPI test flow (`success@razorpay`) is the recommended way to test payments

## Author

**Sarishti** — [GitHub: Sarishti845](https://github.com/Sarishti845)
