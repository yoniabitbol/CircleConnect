import React from "react";
import UserProfile from "../../components/UserProfile";
import getCurrentUserProfile from "../../http/getCurrentUserProfile";
import Usertypes from "../../Models/UserProfileModel";
import { useState, useEffect } from "react";

const Profile: React.FC = () => {
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
    projects: [],
    skills: [],
    experience: [],
    education: [],
    languages: [],
    awards: [],
    courses: [],
  });

  useEffect(() => {
    getCurrentUserProfile().then((res) => {
      setMyUser(res.data.user);
    });
  }, []);


  return (
    <>
      <UserProfile profile={myUser} />
    </>
  );
};

export default Profile;
