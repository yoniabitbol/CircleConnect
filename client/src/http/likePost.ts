import { auth } from "../firebase/config";
const host = process.env.REACT_APP_HOST || 'localhost';
const port = process.env.REACT_APP_BACKEND_PORT || 4000;

async function likePost(post_id: string) {
    const currentUser = auth.currentUser;
    const token = currentUser && (await currentUser.getIdToken());
    const user_id = currentUser && currentUser.uid;
    const url = `http://${host}:${port}/api/posts/${post_id}/like/`;

    const res = await fetch(url, {
        method: "PATCH",
        headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({user_id})
    });

    if (res.ok) {
        const likedPost = await res.json();
        return likedPost;
    } else {
        throw new Error("Failed to like post.");
    }
}

export default likePost;