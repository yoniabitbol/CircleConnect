import { auth } from "../firebase/config";

const port = process.env.REACT_APP_BACKEND_PORT || 4000;
const url = `http://localhost:${port}/api/users?`;

async function getUserProfile() {
  const user = auth.currentUser;
  const token = user && (await user.getIdToken());

  const id = user && user.uid;
  if (!id) {
    return;
  }

  const res = await fetch(url + new URLSearchParams({ user_id: id }), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}

export default getUserProfile;
