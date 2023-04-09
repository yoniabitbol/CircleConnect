import { auth } from "../firebase/config";
const host = process.env.REACT_APP_HOST || 'localhost';
const port = process.env.REACT_APP_BACKEND_PORT || 4000;

async function getUnreadNotification (user_id: string) {
    const currentUser = auth.currentUser;
    const token = currentUser && (await currentUser.getIdToken());
    const url = `http://${host}:${port}/api/notifications/${user_id}`;

    const res = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) {
        throw new Error("Failed to get unread notifications.");
    }

    return res.json();
}

export default getUnreadNotification;
