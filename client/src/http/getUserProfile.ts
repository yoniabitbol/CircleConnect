import { auth } from "../firebase/config";
const port = process.env.REACT_APP_BACKEND_PORT || 4000;
const url = `http://localhost:${port}/api/users?`;

async function getUserProfile(user_id: string) {
    const currentUser = auth.currentUser;
    const token = currentUser && (await currentUser.getIdToken());
    if (!user_id) {
        return { error: "no user ID found" };
    }
    const res = await fetch(url + new URLSearchParams({ user_id: user_id }), {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    return res.json();
}

export default getUserProfile;
