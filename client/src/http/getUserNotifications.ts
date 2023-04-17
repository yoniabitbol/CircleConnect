import { auth } from "../firebase/config";
const host = process.env.REACT_APP_HOST || "localhost";
const port = process.env.REACT_APP_BACKEND_PORT || 4000;

async function getUserNotifications() {
  const currentUser = auth.currentUser;
  const token = currentUser && (await currentUser.getIdToken());
  const currentUserId = currentUser && currentUser.uid;
  const url = `http://${host}:${port}/api/notifications/${currentUserId}`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to get user notifications.");
  }

  return res.json();
}

export default getUserNotifications;
