import { auth } from "../firebase/config";
const port = process.env.REACT_APP_BACKEND_PORT || 4000;
const host = process.env.REACT_APP_BACKEND_HOST || "localhost";
const url = `http://${host}:${port}/files/applications/coverLetter/`;

async function getCoverLetter(coverLetter: string) {
  const currentUser = auth.currentUser;
  const token = currentUser && (await currentUser.getIdToken());

  const res = await fetch(url + coverLetter, {
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
  throw new Error("Failed to fetch cover letter.");
}

export default getCoverLetter;
