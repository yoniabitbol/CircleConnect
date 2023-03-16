import { auth } from "../firebase/config";
const port = process.env.REACT_APP_BACKEND_PORT || 4000;

async function getSocialFeed() {
    const currentUser = auth.currentUser;
    const token = currentUser && (await currentUser.getIdToken());
    const user_id = currentUser && currentUser.uid;
    const url = `http://localhost:${port}/api/posts/${user_id}/feed`;

    const res = await fetch(url, {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        },
    });

    if (res.ok) {
        const socialFeed = await res.json();
        return socialFeed;
    } else {
        throw new Error("Failed to fetch user social feed.");
    }
}

export default getSocialFeed;