import React from "react";
import MyUserProfile from "../../components/MyUserProfile";
import getCurrentUserProfile from "../../http/getCurrentUserProfile";
import Usertypes from "../../Models/UserProfileModel";
import { useState, useEffect } from "react";

const MyProfile: React.FC = () => {
  const [myUser, setMyUser] = useState<Usertypes>({
    name: "",
    title: "",
    location: "",
    email: "",
    phone: "",
    website: "",
    connections: [""],
    picture: "",
    backdrop: "",
    resume: "",
    coverLetter: "",
    summary: "",
    projects: [
      {
        title: "",
        description: "",
        startDate: "",
        endDate: "",
        technologies: "",
        picture: "",
      },
    ],
    skills: [{ name: "", level: "" }],
    experience: [
      {
        title: "",
        startDate: "",
        endDate: "",
        company: "",
        logo: "",
        location: "",
        description: "",
      },
    ],
    education: [
      {
        school: "",
        logo: "",
        degree: "",
        location: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ],
    languages: [{ name: "", level: "" }],
    awards: [{ title: "", date: "", awarder: "", summary: "" }],
    courses: [
      {
        title: "",
        number: "",
        school: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ],
  });

  const [fetchedUser, setFetchedUser] = useState(false);
  useEffect(() => {
    if (fetchedUser) return;
    getCurrentUserProfile().then((res) => {
      // This bug should eventually be fixed
      if (res.data.user.projects[0] === "") {
        res.data.user.projects = [];
      }
      if (res.data.user.skills[0] === "") {
        res.data.user.skills = [];
      }
      if (res.data.user.experience[0] === "") {
        res.data.user.experience = [];
      }
      if (res.data.user.education[0] === "") {
        res.data.user.education = [];
      }
      if (res.data.user.languages[0] === "") {
        res.data.user.languages = [];
      }
      if (res.data.user.awards[0] === "") {
        res.data.user.awards = [];
      }
      if (res.data.user.courses[0] === "") {
        res.data.user.courses = [];
      }

      setMyUser(res.data.user);
    });
    setFetchedUser(true);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <MyUserProfile profile={myUser} />
    </>
  );
};

export default MyProfile;
