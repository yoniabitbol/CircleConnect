import { auth } from "../firebase/config";
const port = process.env.REACT_APP_BACKEND_PORT || 4000;

async function sendConnectionRequest(target_user_id: string) {
  const currentUser = auth.currentUser;
  const token = currentUser && (await currentUser.getIdToken());
  const user_id = currentUser && currentUser.uid;
  const url = `http://localhost:${port}/api/users/${target_user_id}/connect`;

  const res = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ user_id }),
  });

  if (!res.ok) {
    throw new Error("Failed to send connection request.");
  }
}

export default sendConnectionRequest;
