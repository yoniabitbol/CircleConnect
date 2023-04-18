import { auth } from "../firebase/config";
const host = process.env.REACT_APP_HOST || 'localhost';
const port = process.env.REACT_APP_BACKEND_PORT || 4000;

async function markMessageNotificationsRead () {
    const currentUser = auth.currentUser;
    const token = currentUser && (await currentUser.getIdToken());
    const currentUserId = currentUser && currentUser.uid;
    const url = `http://${host}:${port}/api/notifications/${currentUserId}/messages`;

    const res = await fetch(url, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) {
        throw new Error("Failed to mark notification as read.");
    }

    return res.json();
}

export default markMessageNotificationsRead;
