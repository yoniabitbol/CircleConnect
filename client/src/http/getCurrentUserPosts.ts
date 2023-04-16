import { auth } from "../firebase/config";
const host = process.env.REACT_APP_HOST || 'localhost';
const port = process.env.REACT_APP_BACKEND_PORT || 4000;

async function getCurrentUserPosts() {
    const currentUser = auth.currentUser;
    const user_id = currentUser && currentUser.uid;
    const token = currentUser && (await currentUser.getIdToken());
    const url = `http://${host}:${port}/api/posts/user/${user_id}`;
    const res = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    if (res.ok) {
        const posts = await res.json();
        return posts;
    }
    else {
        throw new Error("Failed to fetch user posts.");
    }

}

export default getCurrentUserPosts;