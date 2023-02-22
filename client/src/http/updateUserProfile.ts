import { auth } from "../firebase/config";
// import Usertypes from "../Models/UserProfileModel";

const port = process.env.REACT_APP_BACKEND_PORT || 4000;
const url = `http://localhost:${port}/api/users`;

async function updateUserProfile(formData: FormData) {
  const user = auth.currentUser;
  const token = user && (await user.getIdToken());

  const user_id = user && user.uid;
  console.log(token);
  console.log(user_id);
  if (!user_id) {
    return;
  }

  // Append the user_id to the formData object
  formData.append("user_id", user_id);

  const res = await fetch(url, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });

  // Debugging Log
  // const values = formData.values()
  // for (const val of values){
  //   console.log(val);
  // }

  return res.json();
}

export default updateUserProfile;
