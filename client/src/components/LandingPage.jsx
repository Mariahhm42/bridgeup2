import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LandingPage.scss';

function LandingPage() {
  const navigate = useNavigate();

  const handleSelectRole = (role) => {
    localStorage.setItem('userRole', role);
    navigate('/profile');
  };

  return (
    <div className="landing-container">
      <div className="landing-content">
        <h1 className="landing-title">Welcome to BridgeUp</h1>
        <p className="landing-subtitle">
          Connect mentors and mentees for meaningful growth and conversations.
        </p>
        <div className="landing-buttons">
          <button
            className="landing-button mentee"
            onClick={() => handleSelectRole('mentee')}
          >
            I'm a Mentee
          </button>
          <button
            className="landing-button mentor"
            onClick={() => handleSelectRole('mentor')}
          >
            I'm a Mentor
          </button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
