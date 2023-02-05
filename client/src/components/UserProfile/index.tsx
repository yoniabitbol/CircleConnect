import React from "react";
import { useState, useEffect, useRef } from "react";
import { Formik, Form } from "formik";
import getUserProfile from "../../utils/getUserProfile";
import updateUserProfile from "../../utils/updateUserProfile";

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
import LeftSection from "./Layout/leftSecontion";
import RightSection from "./Layout/rightSection";
import Dashboard from "./Dashboard";

export interface Usertypes {
  name: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  website: string;
  connections: number;
  picture: string;
  backdrop: string;

  summary: string;
  projects: {
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    technologies: string[];
    picture: string;
  }[];
  skills: {
    name: string;
    level: string;
  }[];
  experience: {
    company: string;
    logo: string;
    title: string;
    location: string;
    startDate: string;
    endDate: string;
    description: string;
  }[];
  education: {
    school: string;
    logo: string;
    degree: string;
    location: string;
    startDate: string;
    endDate: string;
    description: string;
  }[];
  languages: {
    name: string;
    level: string;
  }[];
  awards: {
    title: string;
    date: string;
    awarder: string;
    summary: string;
  }[];
  courses: {
    title: string;
    number: string;
    school: string;
    startDate: string;
    endDate: string;
    description: string;
  }[];
}

const UserProfile: React.FC = () => {
  // Make a request to the server to get the user's profile data
  // and then render the components below

  const [User, setUser] = useState<Usertypes>({
    name: " ",
    title: " ",
    location: " ",
    email: " ",
    phone: " ",
    website: " ",
    connections: 0,
    picture: " ",
    backdrop: " ",
    summary: " ",
    projects: [
      {
        title: " ",
        description: " ",
        startDate: " ",
        endDate: " ",
        technologies: [" "],
        picture: " ",
      },
    ],
    skills: [
      {
        name: " ",
        level: " ",
      },
    ],
    experience: [
      {
        company: " ",
        logo: " ",
        title: " ",
        location: " ",
        startDate: " ",
        endDate: " ",
        description: " ",
      },
    ],
    education: [
      {
        school: " ",
        logo: " ",
        degree: " ",
        location: " ",
        startDate: " ",
        endDate: " ",
        description: " ",
      },
    ],
    languages: [
      {
        name: " ",
        level: " ",
      },
    ],
    awards: [
      {
        title: " ",
        date: " ",
        awarder: " ",
        summary: " ",
      },
    ],
    courses: [
      {
        title: " ",
        number: " ",
        school: " ",
        startDate: " ",
        endDate: " ",
        description: " ",
      },
    ],
  });
  // Profile Editable state
  const [editable, setEditable] = useState(false);
  const initialRender = useRef(true);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      getUserProfile().then((res) => {
        setUser({
          name: res.data.user.name,
          title: res.data.user.title,
          location: res.data.user.location,
          email: res.data.user.email,
          phone: res.data.user.phone,
          website: res.data.user.website,
          connections: res.data.user.connections,
          picture: res.data.user.picture,
          backdrop: res.data.user.backdrop,
          summary: res.data.user.summary,
          projects: res.data.user.projects,
          skills: res.data.user.skills,
          experience: res.data.user.experience,
          education: res.data.user.education,
          languages: res.data.user.languages,
          awards: res.data.user.awards,
          courses: res.data.user.courses,
        });
        if (!User) return;
      });
      console.log("fetched");
    } else {
      updateUserProfile(User);
      console.log("updated");
    }
  }, [editable]);

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
          console.log("submited");
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

export default UserProfile;
