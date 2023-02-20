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
    getCurrentUserProfile().then((res) => {
      // This bug should eventually be fixed
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
      if (res.data.user.experience[0] === "") {
        res.data.user.experience = [
          {
            title: "",
            startDate: "",
            endDate: "",
            company: "",
            logo: "",
            location: "",
            description: "",
          },
        ];
      }
      if (res.data.user.education[0] === "") {
        res.data.user.education = [
          {
            school: "",
            logo: "",
            degree: "",
            location: "",
            startDate: "",
            endDate: "",
            description: "",
          },
        ];
      }
      if (res.data.user.languages[0] === "") {
        res.data.user.languages = [{ name: "", level: "" }];
      }
      if (res.data.user.awards[0] === "") {
        res.data.user.awards = [
          { title: "", date: "", awarder: "", summary: "" },
        ];
      }
      if (res.data.user.courses[0] === "") {
        res.data.user.courses = [
          {
            title: "",
            number: "",
            school: "",
            startDate: "",
            endDate: "",
            description: "",
          },
        ];
      }

  useEffect(() => {
    if (!fetchedUser) {
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
        console.log("fetched user");
        setMyUser(res.data.user);
      });
      setFetchedUser(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <MyUserProfile profile={myUser} />
    </>
  );
};

export default MyProfile;
