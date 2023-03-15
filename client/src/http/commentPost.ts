import { auth } from "../firebase/config";
const port = process.env.REACT_APP_BACKEND_PORT || 4000;

async function commentPost(post_id: string, comment: string) {
    const currentUser = auth.currentUser;
    const token = currentUser && (await currentUser.getIdToken());
    const user_id = currentUser && currentUser.uid;
    const url = `http://localhost:${port}/api/posts/${post_id}/comment/`;

    const res = await fetch(url, {
        method: "PATCH",
        headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({commenter: user_id, comment: comment})
    });

    if (res.ok) {
        const commentedPost = await res.json();
        return commentedPost;
    } else {
        throw new Error("Failed to comment post.");
    }
}

export default commentPost;