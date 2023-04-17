import { auth } from "../firebase/config";
const host = process.env.REACT_APP_HOST || 'localhost';
const port = process.env.REACT_APP_BACKEND_PORT || 4000;

async function patchPost(post_id: string, formData: any) {
    const currentUser = auth.currentUser;
    const token = currentUser && (await currentUser.getIdToken());
    // const user_id = currentUser && currentUser.uid;
    const url = `http://${host}:${port}/api/posts/${post_id}`;
    const creatorID = currentUser && currentUser.uid;
    if(!creatorID) {
        return;
    }
    formData.append("creatorID", creatorID)

    const res = await fetch(url, {
        method: "PATCH",
        headers: {Authorization: `Bearer ${token}`,},
        body: formData
    });

    if (res.ok) {
        const patchedPost = await res.json();
        return patchedPost;
    } else {
        throw new Error("Failed to patch post.");
    }
}

export default patchPost;