import React, { useEffect, useState } from "react";

function Session() {
  const mentorId = localStorage.getItem("mentorId");
  const menteeId = localStorage.getItem("menteeId");

  const [mentorName, setMentorName] = useState("");
  const [menteeName, setMenteeName] = useState("");

  useEffect(() => {
    if (mentorId) {
      fetch(`/api/users/${mentorId}`)
        .then((res) => res.json())
        .then((data) => setMentorName(data.name))
        .catch((err) => console.error("Error fetching mentor:", err));
    }

    if (menteeId) {
      fetch(`/api/users/${menteeId}`)
        .then((res) => res.json())
        .then((data) => setMenteeName(data.name))
        .catch((err) => console.error("Error fetching mentee:", err));
    }
  }, [mentorId, menteeId]);

  const endSession = () => {
    window.location.href = "/feedback";
  };

  return (
    <div>
      <h2>Mentorship Session</h2>
      <div>
        <p><strong>Mentor:</strong> {mentorName || mentorId}</p>
        <p><strong>Mentee:</strong> {menteeName || menteeId}</p>
      </div>
      <p>This is your dedicated session space. Discuss freely!</p>
      <button onClick={endSession}>End Session</button>
    </div>
  );
}

export default Session;
