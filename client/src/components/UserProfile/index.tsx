import React from "react";
import { useState, useEffect } from "react";

import Usertypes from "../../Models/UserProfileModel";

import Banner from "../MyUserProfile/Banner";
import Summary from "../MyUserProfile/Summary";
import Projects from "../MyUserProfile/Projects";
import Skills from "../MyUserProfile/Skills";
import Experience from "../MyUserProfile/Experience";
import Education from "../MyUserProfile/Education";
import Languages from "../MyUserProfile/Languages";
import Awards from "../MyUserProfile/Awards";
import Courses from "../MyUserProfile/Courses";

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
        edit={false}
        formik={null}
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
      <Summary edit={false} summary={User.summary} />
      <Projects edit={false} projects={User.projects} />
      <Skills edit={false} skills={User.skills} />
      <Experience edit={false} experience={User.experience} />
      <Education edit={false} education={User.education} />
      <Languages edit={false} languages={User.languages} />
      <Awards edit={false} awards={User.awards} />
      <Courses edit={false} courses={User.courses} />
    </div>
  );
};

export type { Usertypes };
export default UserProfile;
