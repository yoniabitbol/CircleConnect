import { auth } from "../firebase/config";
const port = process.env.REACT_APP_BACKEND_PORT || 4000;

async function getUserChats() {
    const currentUser = auth.currentUser;
    const user_id = currentUser && currentUser.uid;
    const token = currentUser && (await currentUser.getIdToken());
    //Might be wrong
    const url = `http://localhost:${port}/api/users/${user_id}/chats`;

    const res = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    });

    return res.json();


}

export default getUserChats;