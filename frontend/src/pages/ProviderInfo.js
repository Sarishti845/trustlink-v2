

// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { ShieldCheck, Briefcase, MessageSquare, TrendingUp } from "lucide-react";
// import "./ProviderInfo.css";

// function ProviderInfo() {
//   const navigate = useNavigate();

//   return (
//     <div className="provider-info-page">
//       {/* HERO */}
//       <header className="provider-info-hero">
//         <h1>Why Join TrustLink as a Verified Provider?</h1>
//         <p>
//           Empower your business with visibility, trust, and tools that help you grow.
//           TrustLink connects you with real, verified customers who value professionalism
//           and reliability.
//         </p>
//       </header>

//       {/* BENEFITS */}
//       <section className="info-benefits">
//         <div className="benefit-card">
//           <ShieldCheck className="benefit-icon" size={32} />
//           <h3>Verified Badge & Priority Listing</h3>
//           <p>
//             Stand out with a verified badge and get priority in customer search results.
//           </p>
//         </div>

//         <div className="benefit-card">
//           <Briefcase className="benefit-icon" size={32} />
//           <h3>Full Control Over Your Business</h3>
//           <p>
//             Manage your rates, service area, and availability easily from your dashboard.
//           </p>
//         </div>

//         <div className="benefit-card">
//           <MessageSquare className="benefit-icon" size={32} />
//           <h3>Verified Reviews & Ratings</h3>
//           <p>
//             Build your reputation with transparent, verified reviews from real clients.
//           </p>
//         </div>

//         <div className="benefit-card">
//           <TrendingUp className="benefit-icon" size={32} />
//           <h3>Boost Your Income</h3>
//           <p>
//             Keep up to <strong>90% of your earnings</strong> — the lowest commission in the market.
//           </p>
//         </div>
//       </section>

//       {/* PROCESS */}
//       <section className="info-process">
//         <h2>How the Verification Works</h2>
//         <ol>
//           <li>Fill out the provider application form.</li>
//           <li>Upload your government ID and certification.</li>
//           <li>Our team reviews your credentials within 24–48 hours.</li>
//           <li>Once approved, your profile goes live on TrustLink!</li>
//         </ol>
//       </section>

//       {/* CTA */}
//       <section className="info-cta">
//         <h2>Ready to Join?</h2>
//         <p>
//           Start your application today and become part of a growing network of trusted professionals.
//         </p>
//         <button
//           className="apply-now-btn"
//           onClick={() => navigate("/join-provider")}
//         >
//           Apply to Join
//         </button>
//       </section>
//     </div>
//   );
// }

// export default ProviderInfo;











import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  Briefcase,
  MessageSquare,
  TrendingUp,
} from "lucide-react";
import "./ProviderInfo.css";

function ProviderInfo() {
  const navigate = useNavigate();

  const steps = [
    "Fill out the provider application form.",
    "Upload your government ID and certification.",
    "Our team reviews your credentials within 24–48 hours.",
    "Once approved, your profile goes live on TrustLink!",
  ];

  return (
    <div className="provider-info-page">
      {/* HERO */}
      <header className="provider-info-hero">
        <h1>Why Join TrustLink as a Verified Provider?</h1>
        <p>
          Empower your business with visibility, trust, and tools that help you
          grow. TrustLink connects you with real, verified customers who value
          professionalism and reliability.
        </p>
      </header>

      {/* BENEFITS */}
      <section className="info-benefits">
        <div className="benefit-card fade-up">
          <ShieldCheck className="benefit-icon" size={32} />
          <h3>Verified Badge & Priority Listing</h3>
          <p>
            Stand out with a verified badge and get priority in customer search
            results.
          </p>
        </div>

        <div className="benefit-card fade-up">
          <Briefcase className="benefit-icon" size={32} />
          <h3>Full Control Over Your Business</h3>
          <p>
            Manage your rates, service area, and availability easily from your
            dashboard.
          </p>
        </div>

        <div className="benefit-card fade-up">
          <MessageSquare className="benefit-icon" size={32} />
          <h3>Verified Reviews & Ratings</h3>
          <p>
            Build your reputation with transparent, verified reviews from real
            clients.
          </p>
        </div>

        <div className="benefit-card fade-up">
          <TrendingUp className="benefit-icon" size={32} />
          <h3>Boost Your Income</h3>
          <p>
            Keep up to <strong>90% of your earnings</strong> — the lowest
            commission in the market.
          </p>
        </div>
      </section>

      {/* PROCESS */}
      <section className="info-process fade-up">
        <h2>How the Verification Works</h2>
        <div className="process-steps">
          {steps.map((step, index) => (
            <div className="process-step" key={index}>
              <span className="step-number">{index + 1}</span>
              <p>{step}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="info-cta fade-up">
        <h2>Ready to Join?</h2>
        <p>
          Start your application today and become part of a growing network of
          trusted professionals.
        </p>
        <button
          className="apply-now-btn"
          onClick={() => navigate("/join-provider")}
        >
          Apply to Join
        </button>
      </section>
    </div>
  );
}

export default ProviderInfo;
