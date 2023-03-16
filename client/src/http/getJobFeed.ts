import { auth } from "../firebase/config";
const port = process.env.REACT_APP_BACKEND_PORT || 4000;

async function getJobFeed() {
    const currentUser = auth.currentUser;
    const token = currentUser && (await currentUser.getIdToken());
    const user_id = currentUser && currentUser.uid;
    const url = `http://localhost:${port}/api/posts/${user_id}/jobFeed`;

    const res = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    if (res.ok) {
        const jobFeed = await res.json();
        return jobFeed;
    } else {
        throw new Error("Failed to fetch user social feed.");
    }
}

export default getJobFeed;