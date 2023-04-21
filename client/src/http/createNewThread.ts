import { auth } from "../firebase/config";
const port = process.env.REACT_APP_BACKEND_PORT || 4000;
const host = process.env.REACT_APP_HOST || "localhost";
const url = `http://${host}:${port}/api/threads/`;

async function createNewThread(participant2: string) {
    const currentUser = auth.currentUser;
    const token = currentUser && (await currentUser.getIdToken());
    const id = currentUser && currentUser.uid;
    const participant1 = id
    if (!id) {
        return;
    }
    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({participant1, participant2}),
    });
    return res.json();
}

export default createNewThread;
