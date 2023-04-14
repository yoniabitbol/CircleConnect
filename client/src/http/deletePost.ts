import { auth } from "../firebase/config";
const port = process.env.REACT_APP_BACKEND_PORT || 4000;
const host = process.env.REACT_APP_HOST || 'localhost';

async function deletePost(post_id: string) {
    const currentUser = auth.currentUser;
    const token = currentUser && (await currentUser.getIdToken());
    const url = `http://${host}:${port}/api/posts/${post_id}`;
    const creatorID = currentUser && currentUser.uid;
    if(!creatorID) {
        return;
    }
    const res = await fetch(url, {
        method: "DELETE",
        headers: {Authorization: `Bearer ${token}`,},
    });
    if (res.ok) {
        return res;
    } else {
        throw new Error("Failed to create post.");
    }
}

export default deletePost;