import React from "react";
import UserProfile from "../../components/UserProfile";
import getUserProfile from "../../utils/getUserProfile";
import Usertypes from "../../Models/UserProfileModel";

const Profile: React.FC = () => {
  let myUser: Usertypes = {
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
  };

  getUserProfile().then((user) => {
    myUser = user;
    console.log(myUser);
  });

  return (
    <>
      <UserProfile profile={myUser} />
    </>
  );
};

export default Profile;
