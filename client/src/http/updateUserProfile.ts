import { auth } from "../firebase/config";
import {Usertypes} from "../components/UserProfile";

const port = process.env.REACT_APP_BACKEND_PORT || 4000;
const url = `http://localhost:${port}/api/users`;

//review UserTypes and import it from somewhere else, do not keep in here
async function updateUserProfile(profile: Usertypes) {
  const user = auth.currentUser;
  const token = user && (await user.getIdToken());
  const user_id = user && user.uid
  if (!user_id) {
    return;
  }
  const res = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
        user_id,
        name: profile.name,
        title: profile.title,
        location: profile.location,
        email: profile.email,
        phone: profile.phone,
        website: profile.website,
        connections: profile.connections,
        picture: profile.picture,
        backdrop: profile.backdrop,
        summary: profile.summary,
        projects: profile.projects,
        skills: profile.skills,
        experience: profile.experience,
        education: profile.education,
        languages: profile.languages,
        awards: profile.awards,
        courses: profile.courses,
    }),
  });
  return res.json();
}

export default updateUserProfile;
