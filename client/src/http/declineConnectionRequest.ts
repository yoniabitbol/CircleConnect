import { auth } from "../firebase/config";
const port = process.env.REACT_APP_BACKEND_PORT || 4000;

async function declineConnectionRequest(target_user_id: string) {
  const currentUser = auth.currentUser;
  const token = currentUser && (await currentUser.getIdToken());
  const user_id = currentUser && currentUser.uid;
  const url = `http://localhost:${port}/${target_user_id}/decline`;

  const res = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ user_id }),
  });

  if (!res.ok) {
    throw new Error("Failed to decline connection request.");
  }
}

export default declineConnectionRequest;