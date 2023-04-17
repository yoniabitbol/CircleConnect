import { auth } from "../firebase/config";
const port = process.env.REACT_APP_BACKEND_PORT || 4000;
const url = `http://localhost:${port}/files/applications/resume/`;

async function getResume(resume: string) {
  const currentUser = auth.currentUser;
  const token = currentUser && (await currentUser.getIdToken());

  const res = await fetch(url + resume, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (res.ok) {
    const blob = await res.blob();
    return URL.createObjectURL(blob);
  }
  throw new Error("Failed to fetch resume.");
}

export default getResume;
