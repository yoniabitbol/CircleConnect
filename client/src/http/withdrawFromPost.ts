import { auth } from "../firebase/config";
const port = process.env.REACT_APP_BACKEND_PORT || 4000;

async function withdrawFromPost(application_id: string) {
    const currentUser = auth.currentUser;
    const token = currentUser && (await currentUser.getIdToken());
    const user_id = currentUser && currentUser.uid;
    const url = `http://localhost:${port}/api/applications/${application_id}/withdraw`;

    const res = await fetch(url, {
        method: "PATCH",
        headers: {
            "Content-Type" : "application/json",
            Authorization: `Bearer ${token}`,
},
        body: JSON.stringify({ user_id }),
    });

    if(!res.ok) {
        throw new Error("Failed to withdraw from post.");
    }

}

export default withdrawFromPost;
