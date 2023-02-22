import React from "react";
import { useState, useEffect } from "react";

import Usertypes from "../../Models/UserProfileModel";

import Banner from "../UserProfile/Banner";
import Summary from "../UserProfile/Summary";
import Projects from "../UserProfile/Projects";
import Skills from "../UserProfile/Skills";
import Experience from "../UserProfile/Experience";
import Education from "../UserProfile/Education";
import Languages from "../UserProfile/Languages";
import Awards from "../UserProfile/Awards";
import Courses from "../UserProfile/Courses";

const UserProfile: React.FC<{
  profile: Usertypes;
}> = ({ profile }) => {
  const [User, setUser] = useState<Usertypes>(profile);

  useEffect(() => {
    setUser(profile);
  }, [profile]);

  return (
    <div className="flex flex-col gap-5 lg:w-2/3 w-full px-5 lg:px-0 mx-auto my-5">
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
      <Summary  summary={User.summary} />
      <Projects  projects={User.projects} />
      <Skills skills={User.skills} />
      <Experience  experience={User.experience} />
      <Education  education={User.education} />
      <Languages languages={User.languages} />
      <Awards awards={User.awards} />
      <Courses  courses={User.courses} />
    </div>
  );
};

export type { Usertypes };
export default UserProfile;
