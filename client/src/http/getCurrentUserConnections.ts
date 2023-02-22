import { auth } from "../firebase/config";
const port = process.env.REACT_APP_BACKEND_PORT || 4000;

async function getCurrentUserConnections() {
  const currentUser = auth.currentUser;
  const user_id = currentUser && currentUser.uid;
  const token = currentUser && (await currentUser.getIdToken());
  const url = `http://localhost:${port}/api/users/${user_id}/connections`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.ok) {
    const connections = await res.json();
    return connections;
  } else {
    throw new Error("Failed to fetch user connections.");
  }
}

export default getCurrentUserConnections;
