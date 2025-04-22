import React, { useState, useEffect } from "react";

function ProfileForm() {
  const [name, setName] = useState("");
  const [field, setField] = useState("");
  const [bio, setBio] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    const storedRole = localStorage.getItem("userRole");
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      name,
      field,
      bio,
      role
    };

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newUser)
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("userId", data.id);
        // You can navigate or trigger a session start here
      } else {
        console.error("Failed to submit form");
      }
    } catch (err) {
      console.error("Error submitting form", err);
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

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ProfileForm;
