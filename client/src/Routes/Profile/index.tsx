import React from "react";
import UserProfile from "../../components/UserProfile";
import getCurrentUserProfile from "../../http/getCurrentUserProfile";
import getUserProfile from "../../http/getUserProfile";
import Usertypes from "../../Models/UserProfileModel";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

interface Props {
  id?: string;
}

const Profile: React.FC<Props> = ({ id }) => {
  const params = useParams<{ id?: string }>();

  const userId = id || params.id;
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
    if (userId) {
      getUserProfile(userId).then((res) => {
        setMyUser(res.data.user);
      });
    } else {
      getCurrentUserProfile().then((res) => {
        console.log(res.data.user);
        // setMyUser(res.data.user);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <UserProfile profile={myUser} />
    </>
  );
};

export default Profile;
