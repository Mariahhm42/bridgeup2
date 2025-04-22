import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ProfileForm() {
  const [name, setName] = useState("");
  const [field, setField] = useState("");
  const [bio, setBio] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedRole = localStorage.getItem("userRole");
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const newUser = { name, field, bio, role };

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      if (!res.ok) throw new Error("User creation failed");

      const data = await res.json();
      localStorage.setItem("userId", data.id);
      localStorage.setItem("userRole", data.role);

      // Attempt to match
      const matchRes = await fetch("/api/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: data.id, role: data.role }),
      });

      const matchData = await matchRes.json();

      if (matchData.matched) {
        // Save IDs for use in session
        localStorage.setItem("mentorId", matchData.mentorId);
        localStorage.setItem("menteeId", matchData.menteeId);
        navigate("/session");
      } else {
        alert("Waiting for a match...");
      }
    } catch (err) {
      console.error("Submission error:", err);
      alert("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-form">
      <h2>{role === "mentor" ? "Mentor" : "Mentee"} Profile</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label>
          Field:
          <input value={field} onChange={(e) => setField(e.target.value)} required />
        </label>
        <label>
          Bio:
          <textarea value={bio} onChange={(e) => setBio(e.target.value)} required />
        </label>
        {loading ? (
          <div className="spinner" style={{ margin: "20px 0" }}>
            <span>Matching you with a {role === "mentor" ? "mentee" : "mentor"}...</span>
          </div>
        ) : (
          <button type="submit">Submit</button>
        )}
      </form>
    </div>
  );
}

export default ProfileForm;
