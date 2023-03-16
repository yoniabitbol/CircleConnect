import { auth } from "../firebase/config";
const port = process.env.REACT_APP_BACKEND_PORT || 4000;

async function createPost(formData: FormData) {
    const currentUser = auth.currentUser;
    const token = currentUser && (await currentUser.getIdToken());
    const url = `http://localhost:${port}/api/posts`;
    const creatorID = currentUser && currentUser.uid;
    if(!creatorID) {
        return;
    }
    formData.append("creatorID", creatorID)
    const res = await fetch(url, {
        method: "POST",
        headers: {Authorization: `Bearer ${token}`,},
        body: formData
    });

    if (res.ok) {
        const newPost = await res.json();
        return newPost;
    } else {
        throw new Error("Failed to create post.");
    }
}

export default createPost;