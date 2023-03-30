import { auth } from "../firebase/config";
const port = process.env.REACT_APP_BACKEND_PORT || 4000;

async function applyToPost(post_id: string, formData: FormData) {
    const currentUser = auth.currentUser;
    const token = currentUser && (await currentUser.getIdToken());
    const user_id = currentUser && currentUser.uid;
    const url = `http://localhost:${port}/api/applications/${post_id}/apply`;

    if(!user_id) {
        return;
    }
    formData.append("applicantID", user_id);
    const res = await fetch(url, {
        method: "PATCH",
        headers: {Authorization: `Bearer ${token}`,},
        body: formData,
    });


    if (!res.ok) {
        throw new Error("Failed to apply to post.");
    }
    return res.json();
}

export default applyToPost;
