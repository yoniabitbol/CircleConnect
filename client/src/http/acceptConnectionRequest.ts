import { auth } from "../firebase/config";
const host = process.env.REACT_APP_HOST || 'localhost';
const port = process.env.REACT_APP_BACKEND_PORT || 4000;

async function acceptConnectionRequest(target_user_id: string) {
  const currentUser = auth.currentUser;
  const token = currentUser && (await currentUser.getIdToken());
  const user_id = currentUser && currentUser.uid;
  const url = `http://${host}:${port}/api/users/${target_user_id}/accept`;

  const res = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ user_id }),
  });

  if (!res.ok) {
    throw new Error("Failed to accept connection request.");
  }
}

export default acceptConnectionRequest;
