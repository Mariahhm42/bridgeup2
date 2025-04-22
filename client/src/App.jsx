// App.jsx or wherever your routes are set up
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import ProfileForm from "./components/ProfileForm";
// Add other imports as needed

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/profile" element={<ProfileForm />} />
        {/* Other routes */}
      </Routes>
    </Router>
  );
}

export default App;
