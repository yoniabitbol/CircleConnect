import { auth } from "../firebase/config";
const port = process.env.REACT_APP_BACKEND_PORT || 4000;

async function getOutgoingConnectionRequests() {
  const currentUser = auth.currentUser;
  const token = currentUser && (await currentUser.getIdToken());
  const user_id = currentUser && currentUser.uid;
  const url = `http://localhost:${port}/${user_id}/outgoing`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.ok) {
    const outgoingConnections = await res.json();
    return outgoingConnections;
  } else {
    throw new Error("Failed to fetch user outgoing connections.");
  }
}

export default getOutgoingConnectionRequests;
