import { auth } from "../firebase/config";
const port = process.env.REACT_APP_BACKEND_PORT || 4000;
const host = process.env.REACT_APP_HOST || "localhost";
const url = `http://${host}:${port}/api/threads/`;

async function saveMessage(thread_id: string, senderID: string, text: string, file?: string,) {
    const currentUser = auth.currentUser;
    const token = currentUser && (await currentUser.getIdToken());
    const id = currentUser && currentUser.uid;
    if (!id) {
        return;
    }
    const res = await fetch(url + thread_id + '/messages', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({thread_id, senderID, text, file}),
    });
    return res.json();
}

export default saveMessage;
