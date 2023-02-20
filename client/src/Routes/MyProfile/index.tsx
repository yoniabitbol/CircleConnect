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
    connections: 0,
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
    skills: [],
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
