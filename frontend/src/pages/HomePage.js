import React from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Import useNavigate
import HeroSection from '../components/HeroSection';
import PopularServices from '../components/PopularServices';
import HowItWorks from '../components/HowItWorks';
import FeaturedProfessionals from '../components/FeaturedProfessionals';
import JoinProvider from '../components/JoinProvider';
import StatsSection from '../components/StatsSection';
import './HomePage.css'; // 2. Import a new CSS file

function HomePage() {
  const navigate = useNavigate(); // 3. Initialize the navigate function

  return (
    <>
      <HeroSection />
      <PopularServices />
      <FeaturedProfessionals />

      {/* 4. Add the button here */}
      <div className="view-all-container">
        <button className="view-all-btn" onClick={() => navigate('/providers')}>
          View All Providers
        </button>
      </div>

     <div id="how-it-works-section">
        <HowItWorks />
      </div>
      

      <StatsSection />
     
      <div id="join-provider-section">
        <JoinProvider />
      </div>
    </>
  );
}

export default HomePage;