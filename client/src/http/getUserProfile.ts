import { auth } from "../firebase/config";
const host = process.env.REACT_APP_HOST || 'localhost';
const port = process.env.REACT_APP_BACKEND_PORT || 4000;
const url = `http://${host}:${port}/api/users/`;

async function getUserProfile(user_id: string) {
  const currentUser = auth.currentUser;
  const token = currentUser && (await currentUser.getIdToken());
  if (!user_id) {
    return;
  }
  const res = await fetch(url + user_id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return await res.json();
}

export default getUserProfile;
