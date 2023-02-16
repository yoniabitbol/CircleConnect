import { auth } from "../firebase/config";
// import Usertypes from "../Models/UserProfileModel";

const port = process.env.REACT_APP_BACKEND_PORT || 4000;
const url = `http://localhost:${port}/api/users`;

async function updateUserProfile(formData: FormData) {
  const user = auth.currentUser;
  const token = user && (await user.getIdToken());
  console.log("token", token);
  const user_id = user && user.uid;
  if (!user_id) {
    return;
  }

  // Append the user_id to the formData object
  formData.append("user_id", user_id);

  // Log the formData object
  for (const pair of formData.entries()) {
    console.log(pair[0] + ", " + pair[1]);
  }

  const formData2 = new FormData();

  formData2.append("name", "test");
  formData2.append("email", "testEmail");
  formData2.append("picture", "testPicture");
  formData2.append("backdrop", "testBackdrop");

  const res = await fetch(url, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData2,
  });

  return res.json();
}

export default updateUserProfile;
