import { auth } from "../firebase/config";
const host = process.env.REACT_APP_HOST || "localhost";
const port = process.env.REACT_APP_BACKEND_PORT || 4000;

async function sendNotification(target_user_id: string, type: string) {
  const currentUser = auth.currentUser;
  const token = currentUser && (await currentUser.getIdToken());
  const url = `http://${host}:${port}/api/notifications/${target_user_id}`;
  const currentUserId = currentUser && currentUser.uid;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      type: type,
      initiatorID: currentUserId,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to send notification.");
  } 
  return res.json();
}

export default sendNotification;
