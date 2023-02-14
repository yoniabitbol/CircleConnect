import React from "react";
import { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import Usertypes from "../../Models/UserProfileModel";
import updateUserProfile from "../../http/updateUserProfile";

import Banner from "./Banner";
import Summary from "./Summary";
import Projects from "./Projects";
import Skills from "./Skills";
import Experience from "./Experience";
import Education from "./Education";
import Languages from "./Languages";
import Awards from "./Awards";
import Courses from "./Courses";

import Layout from "./Layout/layout";
import LeftSection from "./Layout/leftSection";
import RightSection from "./Layout/rightSection";
import Dashboard from "./Dashboard";

const MyUserProfile: React.FC<{
  profile: Usertypes;
}> = ({ profile }) => {
  const [User, setUser] = useState<Usertypes>(profile);
  const [editable, setEditable] = useState(false);

  useEffect(() => {
    setUser(profile);
  }, [profile]);

  const editProfile = (values: any) => {
    setUser({
      name: values.name,
      title: values.title,
      location: values.location,
      email: values.email,
      phone: values.phone,
      website: values.website,
      connections: values.connections,
      picture: values.picture,
      backdrop: values.backdrop,
      summary: values.summary,
      projects: values.projects,
      skills: values.skills,
      experience: values.experience,
      education: values.education,
      languages: values.languages,
      awards: values.awards,
      courses: values.courses,
    });
    setEditable(!editable);
    updateUserProfile(values);
  };

  return (
    <div>
      <Formik
        initialValues={{
          name: User.name,
          title: User.title,
          location: User.location,
          email: User.email,
          phone: User.phone,
          website: User.website,
          connections: User.connections,
          picture: User.picture,
          backdrop: User.backdrop,
          summary: User.summary,
          projects: User.projects,
          skills: User.skills,
          experience: User.experience,
          education: User.education,
          languages: User.languages,
          awards: User.awards,
          courses: User.courses,
        }}
        enableReinitialize
        onSubmit={(values) => {
          editProfile(values);
        }}
      >
        <Form>
          <Layout>
            <LeftSection>
              <Banner
                edit={editable}
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
              <Summary edit={editable} summary={User.summary} />
              <Projects projects={User.projects} />
              <Skills skills={User.skills} />
              <Experience experience={User.experience} />
              <Education education={User.education} />
              <Languages languages={User.languages} />
              <Awards awards={User.awards} />
              <Courses courses={User.courses} />
            </LeftSection>
            <RightSection>
              <Dashboard />
            </RightSection>
          </Layout>
        </Form>
      </Formik>
    </div>
  );
};

export default MyUserProfile;
