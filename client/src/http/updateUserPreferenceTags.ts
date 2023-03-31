import { auth } from "../firebase/config";
const port = process.env.REACT_APP_BACKEND_PORT || 4000;

async function updateUserPreferenceTags(preferenceTags: string[]) {
  const currentUser = auth.currentUser;
  const user_id = currentUser && currentUser.uid;
  const token = currentUser && (await currentUser.getIdToken());
  const url = `http://localhost:${port}/api/users/${user_id}/tags`;

  const res = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ preferenceTags: preferenceTags }),
  });

  return res.json();
}

export default updateUserPreferenceTags;
