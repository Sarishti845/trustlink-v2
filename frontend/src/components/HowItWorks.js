// import React from 'react';
// import './HowItWorks.css';

// function HowItWorks() {
//   return (
//     <section className="how-it-works-section">
//       <h2>How TrustLink Works</h2>
//       <p>Get connected with verified professionals in 3 simple steps</p>
//       <div className="steps-container">
//         <div className="step-card">
//           <div className="step-number step-1">1</div>
//           <h3>Search & Browse</h3>
//           <p>Browse through our curated list of verified service providers. Filter by location, price, availability, and customer ratings.</p>
//         </div>
//         <div className="step-card">
//           <div className="step-number step-2">2</div>
//           <h3>Book & Confirm</h3>
//           <p>Select your preferred time slot and get instant confirmation. Chat directly with your service provider to discuss requirements.</p>
//         </div>
//         <div className="step-card">
//           <div className="step-number step-3">3</div>
//           <h3>Service & Review</h3>
//           <p>Get professional service at the scheduled time with transparent pricing. Rate your experience and help maintain our community.</p>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default HowItWorks;

import React from 'react';
import './HowItWorks.css';
import { 
  MdOutlineScreenSearchDesktop, 
  MdOutlineBookmarkAdded, 
  MdOutlineStarRate, 
  MdOutlineVerifiedUser,
  MdOutlineChecklist,
  MdOutlineShield,
  MdOutlineSentimentSatisfiedAlt 
} from 'react-icons/md';

function HowItWorks() {
  return (
    <section className="how-it-works-section">
      <h2>How TrustLink Works</h2>
      <p>Get connected with verified professionals in 3 simple steps</p>

      {/* --- Main 3 Steps --- */}
      <div className="steps-container">
        <div className="hiw-step-card">
          <div className="hiw-step-icon-wrapper"><MdOutlineScreenSearchDesktop /></div>
          <div className="hiw-step-number hiw-step-1">1</div>
          <h3>Search & Browse</h3>
          <p>Browse through our curated list of verified service providers. Filter by location, price, availability, and customer ratings.</p>
        </div>
        <div className="hiw-step-card">
          <div className="hiw-step-icon-wrapper"><MdOutlineBookmarkAdded /></div>
          <div className="hiw-step-number hiw-step-2">2</div>
          <h3>Book & Confirm</h3>
          <p>Select your preferred time slot and get instant confirmation. Chat directly with your service provider to discuss requirements.</p>
        </div>
        <div className="hiw-step-card">
          <div className="hiw-step-icon-wrapper"><MdOutlineStarRate /></div>
          <div className="hiw-step-number hiw-step-3">3</div>
          <h3>Service & Review</h3>
          <p>Get professional service at the scheduled time with transparent pricing. Rate your experience and help maintain our community.</p>
        </div>
      </div>

      {/* --- New Guarantee Section --- */}
      <div className="guarantee-section">
        <div className="guarantee-card">
          <div className="guarantee-icon icon-green"><MdOutlineVerifiedUser /></div>
          <h4>ID Verification</h4>
          <p>Government ID and background checks for all providers</p>
        </div>
        <div className="guarantee-card">
          <div className="guarantee-icon icon-blue"><MdOutlineChecklist /></div>
          <h4>License Checks</h4>
          <p>Verified professional licenses and certifications</p>
        </div>
        <div className="guarantee-card">
          <div className="guarantee-icon icon-purple"><MdOutlineShield /></div>
          <h4>Insurance Coverage</h4>
          <p>All providers carry liability insurance for your protection</p>
        </div>
        <div className="guarantee-card">
          <div className="guarantee-icon icon-orange"><MdOutlineSentimentSatisfiedAlt /></div>
          <h4>Satisfaction Guarantee</h4>
          <p>100% satisfaction guarantee or your money back</p>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;