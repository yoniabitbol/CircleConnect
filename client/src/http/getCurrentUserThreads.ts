import { auth } from "../firebase/config";
const port = process.env.REACT_APP_BACKEND_PORT || 4000;
const url = `http://localhost:${port}/api/threads/`;

async function getCurrentUserThreads() {
    const currentUser = auth.currentUser;
    const token = currentUser && (await currentUser.getIdToken());
    const id = currentUser && currentUser.uid;
    if (!id) {
        return;
    }
    const res = await fetch(url + id, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    // console.log(token)
    return res.json();
}

export default getCurrentUserThreads;