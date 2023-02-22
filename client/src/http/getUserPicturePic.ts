import { auth } from "../firebase/config";
const port = process.env.REACT_APP_BACKEND_PORT || 4000;
const url = `http://localhost:${port}/img/users/profilePic/`;

async function getUserProfilePic(profilePic: string) {
  const currentUser = auth.currentUser;
  const token = currentUser && (await currentUser.getIdToken());

  const res = await fetch(url + profilePic, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (res.ok) {
    const blob = await res.blob();
    return URL.createObjectURL(blob);
  } else {
    throw new Error("Failed to fetch user profile picture.");
  }
}

export default getUserProfilePic;
