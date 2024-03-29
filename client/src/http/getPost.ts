import { auth } from "../firebase/config";

const port = process.env.REACT_APP_BACKEND_PORT || 4000;
const host = process.env.REACT_APP_HOST || "localhost";

async function getPost(postId: string) {
  const url = `http://${host}:${port}/api/posts/${postId}`;
  const user = auth.currentUser;
  const token = user && (await user.getIdToken());
  const id = user && user.uid;
  if (!id) return;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}

export default getPost;
