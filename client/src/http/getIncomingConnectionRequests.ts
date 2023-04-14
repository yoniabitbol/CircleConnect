import { auth } from "../firebase/config";

const host = process.env.REACT_APP_HOST || 'localhost';
const port = process.env.REACT_APP_BACKEND_PORT || 4000;

async function getIncomingConnectionRequests() {
  const currentUser = auth.currentUser;
  const token = currentUser && (await currentUser.getIdToken());
  const user_id = currentUser && currentUser.uid;
  const url = `http://${host}:${port}/api/users/${user_id}/incoming`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.ok) {
    const incomingConnections = await res.json();
    return incomingConnections;
  } else {
    throw new Error("Failed to fetch user incoming connections.");
  }
}

export default getIncomingConnectionRequests;
