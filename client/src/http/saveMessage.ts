import { auth } from "../firebase/config";
const port = process.env.REACT_APP_BACKEND_PORT || 4000;
const host = process.env.REACT_APP_HOST || "localhost";
const url = `http://${host}:${port}/api/threads/`;

async function saveMessage(formData:FormData) {
    const currentUser = auth.currentUser;
    const token = currentUser && (await currentUser.getIdToken());
    const id = currentUser && currentUser.uid;
    const thread_id = formData.get("thread_id");
    if (!id) {
        return;
    }
    const res = await fetch(url + thread_id + '/messages', {
        method: "POST",
        headers: {Authorization: `Bearer ${token}`,},
        body: formData
    });
    return res.json();
}

export default saveMessage;
