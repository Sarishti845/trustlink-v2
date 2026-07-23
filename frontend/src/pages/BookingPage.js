import { API_BASE_URL } from '../config';
// import React, { useState, useEffect, useContext } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import DatePicker from 'react-datepicker';
// import { AuthContext } from '../context/AuthContext';
// import './BookingPage.css';

// function BookingPage() {
//   const { providerId } = useParams();
//   const navigate = useNavigate();
//   const { userInfo } = useContext(AuthContext);

//   const [provider, setProvider] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Form state
//   const [bookingDate, setBookingDate] = useState(new Date());
//   const [bookingTime, setBookingTime] = useState('09:00');
//   const estimatedDuration = 2; // Default 2 hours

//   useEffect(() => {
//     const fetchProvider = async () => {
//       try {
//         const { data } = await axios.get(`${API_BASE_URL}/api/providers/${providerId}`);
//         setProvider(data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching provider details:', error);
//         setLoading(false);
//       }
//     };
//     fetchProvider();
//   }, [providerId]);

//   const handleConfirmBooking = async () => {
//     if (!userInfo) {
//       alert('Please login to make a booking.');
//       navigate('/login');
//       return;
//     }

//     const bookingData = {
//       provider: provider._id,
//       bookingDate,
//       bookingTime,
//       totalCost: provider.hourlyRate * estimatedDuration,
//     };

//     try {
//       // We need to send our token to access this protected route
//       const config = {
//         headers: {
//           Authorization: `Bearer ${userInfo.token}`,
//         },
//       };

//       const { data } = await axios.post(`${API_BASE_URL}/api/bookings`, bookingData, config);

//       alert('Booking successful!');
//       navigate('/'); // Navigate to homepage after booking

//     } catch (error) {
//       console.error('Booking failed:', error);
//       alert('Booking failed. Please try again.');
//     }
//   };

//   if (loading) return <div>Loading...</div>;
//   if (!provider) return <div>Provider not found.</div>;

//   const totalEstimate = provider.hourlyRate * estimatedDuration;

//   return (
//     <div className="booking-page-container">
//       <div className="booking-form-section">
//         <div className="form-card">
//           <h3>Contact Information</h3>
//           {/* Add inputs for name, email, phone etc. here */}
//         </div>
//         <div className="form-card">
//           <h3>Service Location</h3>
//           {/* Add inputs for address here */}
//         </div>
//         <div className="form-card">
//           <h3>Schedule Your Appointment</h3>
//           <div className="input-row">
//             <div className="form-group">
//                 <label>Select Date</label>
//                 <DatePicker selected={bookingDate} onChange={(date) => setBookingDate(date)} />
//             </div>
//              <div className="form-group">
//                 <label>Select Time</label>
//                 <select value={bookingTime} onChange={(e) => setBookingTime(e.target.value)}>
//                     <option>09:00</option><option>10:00</option><option>11:00</option>
//                     <option>12:00</option><option>13:00</option><option>14:00</option>
//                     <option>15:00</option><option>16:00</option><option>17:00</option>
//                 </select>
//             </div>
//           </div>
//         </div>
//       </div>

//       <aside className="booking-summary-card">
//         <h3>Booking Summary</h3>
//         <div className="summary-provider">
//           <img src={provider.image} alt={provider.user.name} />
//           <div>
//             <h4>{provider.user.name}</h4>
//             <p>{provider.serviceCategory}</p>
//           </div>
//         </div>
//         <div className="summary-details">
//           <ul>
//             <li><span>Date</span> <span>{bookingDate.toLocaleDateString()}</span></li>
//             <li><span>Time</span> <span>{bookingTime}</span></li>
//             <li><span>Hourly Rate</span> <span>${provider.hourlyRate.toFixed(2)}</span></li>
//             <li><span>Estimated Duration</span> <span>{estimatedDuration} hours</span></li>
//             <li className="total-estimate"><span>Total Estimate</span> <span>${totalEstimate.toFixed(2)}</span></li>
//           </ul>
//         </div>
//         <button className="confirm-booking-btn" onClick={handleConfirmBooking}>Confirm Booking</button>
//       </aside>
//     </div>
//   );
// }

// export default BookingPage;
import { FaCalendarAlt } from 'react-icons/fa';
import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import { AuthContext } from '../context/AuthContext';
import './BookingPage.css';

function BookingPage() {
  const { providerId } = useParams();
  const navigate = useNavigate();
  const { userInfo } = useContext(AuthContext);

  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [bookingDate, setBookingDate] = useState(new Date());
  const [bookingTime, setBookingTime] = useState('09:00');
  const [additionalDetails, setAdditionalDetails] = useState('');
  const estimatedDuration = 2;

  useEffect(() => {
    if (userInfo) {
      setFirstName(userInfo.name.split(' ')[0] || '');
      setLastName(userInfo.name.split(' ')[1] || '');
      setEmail(userInfo.email || '');
    }
  }, [userInfo]);

  useEffect(() => {
    const fetchProvider = async () => {
      try {
        const { data } = await axios.get(`${API_BASE_URL}/api/providers/${providerId}`);
        setProvider(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching provider details:', error);
        setLoading(false);
      }
    };
    fetchProvider();
  }, [providerId]);

  // const handleConfirmBooking = async () => {
  //   if (!userInfo) {
  //     alert('Please login to make a booking.');
  //     navigate('/login');
  //     return;
  //   }

  //   const bookingData = {
  //     // provider: provider._id,
  //     provider: provider.user._id,
  //     bookingDate,
  //     bookingTime,
  //     totalCost: provider.hourlyRate * estimatedDuration,
  //   };

  //   try {
  //     const config = {
  //       headers: {
  //         Authorization: `Bearer ${userInfo.token}`,
  //       },
  //     };

  //     const { data } = await axios.post(`${API_BASE_URL}/api/bookings`, bookingData, config);

  //     console.log('Booking created:', data); // This line fixes the warning

  //     alert('Booking successful!');
  //     navigate('/'); // Navigate to homepage after booking

  //   } catch (error) {
  //     console.error('Booking failed:', error);
  //     alert('Booking failed. Please try again.');
  //   }
  // };
  const handleConfirmBooking = async () => {
  if (!userInfo) {
    alert('Please login to make a booking.');
    navigate('/login');
    return;
  }

  try {
    // 1️⃣ Create Razorpay Order
    const orderRes = await axios.post(
      `${API_BASE_URL}/api/payment/create-order`,
      { amount: totalEstimate }   // amount in INR
    );

    const order = orderRes.data;

    // 2️⃣ Initialize Razorpay Checkout
    const options = {
      key: "rzp_test_RiW0eLt2MwgNVv", // your TEST KEY ID
      amount: order.amount,
      currency: "INR",
      name: "TrustLink Services",
      description: "Service Booking Payment",
      order_id: order.id,
      handler: async function (response) {
        // 3️⃣ On Payment Success → Save booking in DB
        const bookingData = {
          provider: provider.user._id,
          bookingDate,
          bookingTime,
          totalCost: totalEstimate,
          paymentId: response.razorpay_payment_id,
          orderId: order.id
        };

        const config = {
          headers: { Authorization: `Bearer ${userInfo.token}` }
        };

        await axios.post(`${API_BASE_URL}/api/bookings`, bookingData, config);

        alert("Payment successful! Booking confirmed 🎉");
        navigate("/");
      },
      theme: {
        color: "#0d6efd",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();

  } catch (error) {
    console.error(error);
    alert("Payment failed to initiate");
  }
};


  if (loading) return <div>Loading...</div>;
  if (!provider) return <div>Provider not found.</div>;

  const totalEstimate = provider.hourlyRate * estimatedDuration;

  return (
    <div className="booking-page-container">
      <div className="booking-form-section">
        <h2>Book Your Service</h2>
        <p style={{ marginTop: '-15px', color: '#64748b' }}>Fill out the details below to schedule your appointment</p>

        <div className="form-card">
          <h3>Contact Information</h3>
          <div className="input-row">
            <div className="form-group"><label>First Name</label><input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} /></div>
            <div className="form-group"><label>Last Name</label><input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} /></div>
          </div>
          <div className="input-row">
            <div className="form-group"><label>Email</label><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
            <div className="form-group"><label>Phone</label><input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} /></div>
          </div>
        </div>

        <div className="form-card">
          <h3>Service Location</h3>
          <div className="form-group"><label>Full Address</label><textarea placeholder="Enter the complete address..." value={address} onChange={(e) => setAddress(e.target.value)}></textarea></div>
        </div>

        <div className="form-card">
          <h3>Schedule Your Appointment</h3>
          <div className="input-row">
            <div className="form-group">
                <label>Select Date</label>
                <DatePicker selected={bookingDate} onChange={(date) => setBookingDate(date)} />
            </div>
             <div className="form-group">
                <label>Select Time</label>
                <select value={bookingTime} onChange={(e) => setBookingTime(e.target.value)}>
                  <option>09:00</option>
                  <option>10:00</option>
                  <option>11:00</option>
                  <option>12:00</option>
                  <option>13:00</option>
                  <option>14:00</option>
                  <option>15:00</option>
                  <option>16:00</option>
                  <option>17:00</option>
                </select>
            </div>
          </div>
        </div>

         <div className="form-card">
            <h3>Additional Details</h3>
            <div className="form-group">
                <label>Special Instructions (Optional)</label>
                <textarea placeholder="Any specific requirements..." value={additionalDetails} onChange={(e) => setAdditionalDetails(e.target.value)}></textarea>
            </div>
        </div>
      </div>
      <aside className="booking-summary-card">
        <h3>Booking Summary</h3>
        <div className="summary-provider">
          <img src={provider.image} alt={provider.user.name} />
          <div>
            <h4>{provider.user.name}</h4>
            <p>Licensed Professional</p>
          </div>
        </div>

        <div className="summary-date">
          <FaCalendarAlt />
          <span>{bookingDate.toLocaleDateString()}</span>
        </div>

        <div className="summary-details">
          <ul>
            <li><span>Hourly Rate</span> <span>${provider.hourlyRate.toFixed(2)}</span></li>
            <li><span>Estimated Duration</span> <span>{estimatedDuration} hours</span></li>
            <li className="total-estimate">
              <span>Total Estimate</span> 
              <span>${totalEstimate.toFixed(2)}</span>
            </li>
          </ul>
          <p className="summary-footer-text">Final cost will be based on actual time spent</p>
        </div>

        <button className="confirm-booking-btn" onClick={handleConfirmBooking}>Confirm Booking</button>
        <p className="summary-footer-text">You will receive a confirmation email after booking</p>
      </aside>
    </div>
  );
}

export default BookingPage;
