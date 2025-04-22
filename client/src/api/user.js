async function createUser(user) {
  const res = await fetch("/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });

  if (!res.ok) throw new Error("Error creating user");
  return await res.json();
}

async function addToMatchQueue(user) {
  const res = await fetch("/api/match-queue", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId: user.id, role: user.role }),
  });

  if (!res.ok) throw new Error("Error adding to match queue");
}

export { createUser, addToMatchQueue };
