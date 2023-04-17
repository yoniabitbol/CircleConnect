import { auth } from "../firebase/config";
const port = process.env.REACT_APP_BACKEND_PORT || 4000;
const host = process.env.REACT_APP_HOST || "localhost";
const url = `http://${host}:${port}/api/threads/`;

async function getThreadMessages(thread_id: string) {
    const currentUser = auth.currentUser;
    const token = currentUser && (await currentUser.getIdToken());
    const id = currentUser && currentUser.uid;
    if (!id) {
        return;
    }
    const res = await fetch(url + thread_id + '/messages', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    return res.json();
}

export default getThreadMessages;
