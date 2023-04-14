import { auth } from "../firebase/config";
const host = process.env.REACT_APP_HOST || 'localhost';
const port = process.env.REACT_APP_BACKEND_PORT || 4000;
const url = `http://${host}:${port}/img/users/posts/`;

async function getPostImage(postImage: string) {
  const currentUser = auth.currentUser;
  const token = currentUser && (await currentUser.getIdToken());

  const res = await fetch(url + postImage, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if(!res.ok) {
    throw new Error("Failed to fetch post image.");
  }
  if (res.ok) {
    const blob = await res.blob();
    return URL.createObjectURL(blob);
  }
}

export default getPostImage;