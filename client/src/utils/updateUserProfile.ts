import { auth } from "../firebase/config";

const port = process.env.REACT_APP_BACKEND_PORT || 4000;
const url = `http://localhost:${port}/api/users`;

interface Usertypes {
  name: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  website: string;
  connections: number;
  picture: string;
  backdrop: string;

  summary: string;
  projects: {
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    technologies: string[];
    picture: string;
  }[];
  skills: {
    name: string;
    level: string;
  }[];
  experience: {
    company: string;
    logo: string;
    title: string;
    location: string;
    startDate: string;
    endDate: string;
    description: string;
  }[];
  education: {
    school: string;
    logo: string;
    degree: string;
    location: string;
    startDate: string;
    endDate: string;
    description: string;
  }[];
  languages: {
    name: string;
    level: string;
  }[];
  awards: {
    title: string;
    date: string;
    awarder: string;
    summary: string;
  }[];
  courses: {
    title: string;
    number: string;
    school: string;
    startDate: string;
    endDate: string;
    description: string;
  }[];
}
//review UserTypes and import it from somewhere else, do not keep in here
async function updateUserProfile(profile: Usertypes) {
  const user = auth.currentUser;
  const token = user && (await user.getIdToken());

  const id = user && user.uid;
  if (!id) {
    return;
  }
  const res = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      id,
      profile,
    }),
  });
  return res.json();
}

export default updateUserProfile;
