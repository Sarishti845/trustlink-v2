// import React from 'react';

// function HelpPage() {
//   return (
//     <div style={{ padding: '50px', textAlign: 'center' }}>
//       <h1>Help & Support Center</h1>
//       <p>Frequently asked questions and contact information will be here.</p>
//     </div>
//   );
// }

// export default HelpPage;




// import React, { useState } from 'react';
// import './HelpPage.css';
// import { FaSearch, FaChevronDown } from 'react-icons/fa';

// // Helper component for individual FAQ items
// const FaqItem = ({ question, answer }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   return (
//     <div className="faq-item">
//       <div className={`faq-question ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(!isOpen)}>
//         {question}
//         <FaChevronDown />
//       </div>
//       {isOpen && <div className="faq-answer">{answer}</div>}
//     </div>
//   );
// };

// function HelpPage() {
//   // Placeholder FAQ data
//   const faqs = {
//     'Getting Started': [
//       { q: 'How do I create an account?', a: 'Click the "Sign Up" button and fill in your details.' },
//       { q: 'How do I search for a service?', a: 'Use the search bar on the homepage or browse categories.' },
//     ],
//     'Booking a Service': [
//       { q: 'How do I book a provider?', a: 'Click "View Profile" on a provider card, then click "Book Now" and follow the steps.' },
//       { q: 'Can I cancel a booking?', a: 'Yes, cancellations are possible depending on the provider\'s policy. Check your "My Bookings" page.' },
//     ],
//     // Add more categories and questions here
//   };

//   return (
//     <div className="help-page-container">
//       <div className="help-header">
//         <h1>Help & Support Center</h1>
//         <p>Find answers to common questions or get in touch with our team.</p>
//       </div>

//       <div className="search-bar-help">
//         <FaSearch />
//         <input type="text" placeholder="Search help articles..." />
//       </div>

//       <div className="faq-section">
//         {Object.entries(faqs).map(([category, items]) => (
//           <div key={category} className="faq-category">
//             <h2>{category}</h2>
//             {items.map((item, index) => (
//               <FaqItem key={index} question={item.q} answer={item.a} />
//             ))}
//           </div>
//         ))}
//       </div>

//       <div className="contact-section">
//         <h2>Still Need Help?</h2>
//         <p>If you couldn't find the answer you were looking for, please contact us.</p>
//         <p>Email: support@trustlink.com</p>
//         {/* Add Phone/Chat links if applicable */}
//       </div>
//     </div>
//   );
// }

// export default HelpPage;



// import React, { useState } from "react";
// import "./HelpPage.css";
// import { FaSearch, FaChevronDown } from "react-icons/fa";






// // Reusable FAQ Item Component
// const FaqItem = ({ question, answer }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div className={`faq-item ${isOpen ? "open" : ""}`}>
//       <div
//         className="faq-question"
//         onClick={() => setIsOpen(!isOpen)}
//         role="button"
//       >
//         <span>{question}</span>
//         <FaChevronDown className={`faq-icon ${isOpen ? "rotate" : ""}`} />
//       </div>
//       {isOpen && <div className="faq-answer">{answer}</div>}
//     </div>
//   );
// };

// function HelpPage() {
//   const [query, setQuery] = useState("");

//   // FAQ Data
//   const faqs = {
//     "Getting Started": [
//       {
//         q: "How do I create an account?",
//         a: 'Click the "Sign Up" button and fill in your details. You can also sign in using Google for faster setup.',
//       },
//       {
//         q: "How do I search for a service?",
//         a: 'Use the search bar on the homepage or browse service categories like Plumbing, Tutoring, and Electrical.',
//       },
//     ],
//     "Booking a Service": [
//       {
//         q: "How do I book a provider?",
//         a: 'Click "View Profile" on a provider card, then click "Book Now" and follow the booking steps.',
//       },
//       {
//         q: "Can I cancel a booking?",
//         a: 'Yes, cancellations are allowed based on the provider’s policy. Check the “My Bookings” section for details.',
//       },
//     ],
//     Payments: [
//       {
//         q: "What payment methods are supported?",
//         a: "We support UPI, debit/credit cards, and wallet payments. All transactions are encrypted and secure.",
//       },
//       {
//         q: "Do you offer refunds?",
//         a: "Yes, refunds are processed within 5–7 business days depending on your payment method and provider policy.",
//       },
//     ],
//   };

//   // Filtered search logic
//   const filteredFaqs = Object.entries(faqs).map(([category, items]) => ({
//     category,
//     items: items.filter(
//       (item) =>
//         item.q.toLowerCase().includes(query.toLowerCase()) ||
//         item.a.toLowerCase().includes(query.toLowerCase())
//     ),
//   }));

//   return (
//     <div className="help-page-container">
//       {/* HEADER SECTION */}
//       <div className="help-header">
//         <h1>Help & Support Center</h1>
//         <p>Find answers to common questions or get in touch with our team.</p>
//       </div>

//       {/* SEARCH BAR */}
//       <div className="search-bar-help">
//         <FaSearch className="search-icon" />
//         <input
//           type="text"
//           placeholder="Search help articles..."
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//         />
//       </div>

//       {/* FAQ SECTION */}
//       <div className="faq-section">
//         {filteredFaqs.map(
//           ({ category, items }) =>
//             items.length > 0 && (
//               <div key={category} className="faq-category">
//                 <h2>{category}</h2>
//                 {items.map((item, index) => (
//                   <FaqItem
//                     key={`${category}-${index}`}
//                     question={item.q}
//                     answer={item.a}
//                   />
//                 ))}
//               </div>
//             )
//         )}
//       </div>

//       {/* CONTACT SECTION */}
//       <div className="contact-section">
//         <h2>Still Need Help?</h2>
//         <p>
//           If you couldn’t find the answer you were looking for, our support team
//           is happy to assist you.
//         </p>
//         <div className="contact-options">
//           <button className="contact-btn email">📧 Email Support</button>
//           <button className="contact-btn chat">💬 Live Chat</button>
//           <button className="contact-btn call">📞 Request Callback</button>
//         </div>
//         <p className="support-email">support@trustlink.com</p>
//       </div>
//     </div>
//   );
// }

// export default HelpPage;



import React, { useState } from "react";
import "./HelpPage.css";
import { FaSearch, FaChevronDown } from "react-icons/fa";
import SupportChatWidget from "../components/SupportChatWidget"; // ✅ Import the chat widget


// ----------------------
// Reusable FAQ Item
// ----------------------
const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`faq-item ${isOpen ? "open" : ""}`}>
      <div
        className="faq-question"
        onClick={() => setIsOpen(!isOpen)}
        role="button"
      >
        <span>{question}</span>
        <FaChevronDown className={`faq-icon ${isOpen ? "rotate" : ""}`} />
      </div>
      {isOpen && <div className="faq-answer">{answer}</div>}
    </div>
  );
};


// ----------------------
// Main Help Page
// ----------------------
function HelpPage() {
  const [query, setQuery] = useState("");

  // ----------------------
  // FAQ Data
  // ----------------------
  const faqs = {
    "Getting Started": [
      {
        q: "How do I create an account?",
        a: 'Click the "Sign Up" button and fill in your details. You can also sign in using Google for faster setup.',
      },
      {
        q: "How do I search for a service?",
        a: 'Use the search bar on the homepage or browse service categories like Plumbing, Tutoring, and Electrical.',
      },
    ],
    "Booking a Service": [
      {
        q: "How do I book a provider?",
        a: 'Click "View Profile" on a provider card, then click "Book Now" and follow the booking steps.',
      },
      {
        q: "Can I cancel a booking?",
        a: 'Yes, cancellations are allowed based on the provider’s policy. Check the “My Bookings” section for details.',
      },
    ],
    Payments: [
      {
        q: "What payment methods are supported?",
        a: "We support UPI, debit/credit cards, and wallet payments. All transactions are encrypted and secure.",
      },
      {
        q: "Do you offer refunds?",
        a: "Yes, refunds are processed within 5–7 business days depending on your payment method and provider policy.",
      },
    ],
  };

  // ----------------------
  // Search Filter Logic
  // ----------------------
  const filteredFaqs = Object.entries(faqs).map(([category, items]) => ({
    category,
    items: items.filter(
      (item) =>
        item.q.toLowerCase().includes(query.toLowerCase()) ||
        item.a.toLowerCase().includes(query.toLowerCase())
    ),
  }));


  // ----------------------
  // Render Section
  // ----------------------
  return (
    <>
      <div className="help-page-container">
        {/* ===== HEADER SECTION ===== */}
        <div className="help-header">
          <h1>Help & Support Center</h1>
          <p>Find answers to common questions or get in touch with our team.</p>
        </div>

        {/* ===== SEARCH BAR ===== */}
        <div className="search-bar-help">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search help articles..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {/* ===== FAQ SECTION ===== */}
        <div className="faq-section">
          {filteredFaqs.map(
            ({ category, items }) =>
              items.length > 0 && (
                <div key={category} className="faq-category">
                  <h2>{category}</h2>
                  {items.map((item, index) => (
                    <FaqItem
                      key={`${category}-${index}`}
                      question={item.q}
                      answer={item.a}
                    />
                  ))}
                </div>
              )
          )}
        </div>

        {/* ===== CONTACT SECTION ===== */}
        <div className="contact-section">
          <h2>Still Need Help?</h2>
          <p>
            If you couldn’t find the answer you were looking for, our support
            team is happy to assist you.
          </p>

          <div className="contact-options">
            <button className="contact-btn email">📧 Email Support</button>
            <button className="contact-btn chat">💬 Live Chat</button>
            <button className="contact-btn call">📞 Request Callback</button>
          </div>

          <p className="support-email">support@trustlink.com</p>
        </div>
      </div>

      {/* ===== FIXED CHAT WIDGET (BOTTOM RIGHT) ===== */}
      <SupportChatWidget />
    </>
  );
}

export default HelpPage;
