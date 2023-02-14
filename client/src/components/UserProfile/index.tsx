import React from "react";
import { useState, useEffect } from "react";

import Usertypes from "../../Models/UserProfileModel";

import Banner from "./Banner";
import Summary from "./Summary";
import Projects from "./Projects";
import Skills from "./Skills";
import Experience from "./Experience";
import Education from "./Education";
import Languages from "./Languages";
import Awards from "./Awards";
import Courses from "./Courses";

const UserProfile: React.FC<{
  profile: Usertypes;
}> = ({ profile }) => {
  const [User, setUser] = useState<Usertypes>(profile);

  useEffect(() => {
    setUser(profile);
  }, [profile]);

  return (
    <div>
      <Banner
        banner={{
          name: User.name,
          title: User.title,
          location: User.location,
          email: User.email,
          phone: User.phone,
          website: User.website,
          connections: User.connections,
          picture: User.picture,
          backdrop: User.backdrop,
        }}
      />
      <Summary summary={User.summary} />
      <Projects projects={User.projects} />
      <Skills skills={User.skills} />
      <Experience experience={User.experience} />
      <Education education={User.education} />
      <Languages languages={User.languages} />
      <Awards awards={User.awards} />
      <Courses courses={User.courses} />
    </div>
  );
};

export default UserProfile;
