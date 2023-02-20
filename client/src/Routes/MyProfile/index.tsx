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
    experience: [],
    education: [],
    languages: [],
    awards: [],
    courses: [],
  });

  useEffect(() => {
    getCurrentUserProfile().then((res) => {
      if (res.data.user.projects[0] === "") {
        res.data.user.projects = [
          {
            title: "",
            description: "",
            startDate: "",
            endDate: "",
            technologies: "",
            picture: "",
          },
        ];
      }
      if (res.data.user.skills[0] === "") {
        res.data.user.skills = [
          {
            name: "",
            level: "",
          },
        ];
      }

      setMyUser(res.data.user);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <MyUserProfile profile={myUser} />
    </>
  );
};

export default MyProfile;
