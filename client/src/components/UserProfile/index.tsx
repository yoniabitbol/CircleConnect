import React from "react";
import { useState } from "react";
import { Formik, Form } from "formik";

import Banner from "./Banner";
import Summary from "./Summary";
import Projects from "./Projects";
import Skills from "./Skills";
import Experience from "./Experience";
import Education from "./Education";
import Languages from "./Languages";
import Awards from "./Awards";
import Courses from "./Courses";

interface Usertypes {
  banner: {
    name: string;
    title: string;
    location: string;
    email: string;
    phone: string;
    website: string;
    connections: number;
    picture: string;
    backdrop: string;
  };
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
  const User: Usertypes = {
    banner: {
      name: "John Doe",
      title: "Software Engineer",
      location: "New York, NY",
      email: "johndoe@gmail.com",
      phone: "555-555-5555",
      website: "www.johndoe.com",
      connections: 500,
      picture: "https://randomuser.me/api/portraits/women/76.jpg",
      backdrop: "https://source.unsplash.com/random",
    },

    summary:
      // eslint-disable-next-line max-len
      "I am a software engineer with 5 years of experience in the field. I have worked on many projects and have a lot of experience in the field.",

    projects: [
      {
        title: "Google Maps",
        description:
          "I worked on the Google Maps team and worked on the front end of the application.",
        startDate: "2018-01-01",
        endDate: "2019-01-01",
        technologies: ["JavaScript", "React", "Node", "MongoDB"],
        picture: "https://source.unsplash.com/random",
      },
      {
        title: "Facebook Messenger",
        description:
          "I worked on the Facebook Messenger team and worked on the front end of the application.",
        startDate: "2019-01-01",
        endDate: "2020-01-01",
        technologies: ["JavaScript", "React", "Node", "MongoDB"],
        picture: "https://source.unsplash.com/random",
      },
    ],

    skills: [
      {
        name: "JavaScript",
        level: "Advanced",
      },
      {
        name: "React",
        level: "Advanced",
      },
      {
        name: "Node",
        level: "Intermediate",
      },
      {
        name: "MongoDB",
        level: "Intermediate",
      },
      {
        name: "HTML",
        level: "Advanced",
      },
      {
        name: "CSS",
        level: "Advanced",
      },
    ],
    experience: [
      {
        company: "Google",
        logo: "https://source.unsplash.com/random",
        title: "Software Engineer",
        location: "New York, NY",
        startDate: "2018-01-01",
        endDate: "2019-01-01",
        description:
          "I worked on the Google Maps team and worked on the front end of the application.",
      },
      {
        company: "Facebook",
        logo: "https://source.unsplash.com/random",
        title: "Software Engineer",
        location: "New York, NY",
        startDate: "2019-01-01",
        endDate: "2020-01-01",
        description:
          "I worked on the Facebook Messenger team and worked on the front end of the application.",
      },
    ],
    education: [
      {
        school: "University of California, Berkeley",
        logo: "https://source.unsplash.com/random",
        degree: "B.S. Computer Science",
        location: "Berkeley, CA",
        startDate: "2015-01-01",
        endDate: "2019-01-01",
        description:
          "I studied computer science at UC Berkeley and graduated with a B.S. in Computer Science.",
      },
    ],
    languages: [
      {
        name: "English",
        level: "Native",
      },
      {
        name: "Spanish",
        level: "Intermediate",
      },
    ],
    awards: [
      {
        title: "Best Software Engineer",
        date: "2019-01-01",
        awarder: "Google",
        summary: "I won the award for best software engineer at Google.",
      },
    ],
    courses: [
      {
        title: "Introduction to Computer Science",
        number: "CS 61A",
        school: "University of California, Berkeley",
        startDate: "2015-01-01",
        endDate: "2015-05-01",
        description:
          "I took an introductory computer science course at UC Berkeley.",
      },
    ],
  };

  // Profile Editable state
  const [editable, setEditable] = useState(false);

  const editProfile = () => {
    setEditable(!editable);
  };

  const updateBanner = (updatedInfo: any) => {
    console.log(updatedInfo);
    User.banner = updatedInfo;
  };

  return (
    <div>
      <Formik
        initialValues={{
          name: User.banner.name,
          title: User.banner.title,
          location: User.banner.location,
          email: User.banner.email,
          phone: User.banner.phone,
          website: User.banner.website,
          connections: User.banner.connections,
          picture: User.banner.picture,
          backdrop: User.banner.backdrop,
        }}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        <Form>
          <Banner
            edit={editable}
            updatedBanner={updateBanner}
            handleEdit={editProfile}
            banner={User.banner}
          />
          <Summary summary={User.summary} />
          <Projects projects={User.projects} />
          <Skills skills={User.skills} />
          <Experience experience={User.experience} />
          <Education />
          <Languages />
          <Awards />
          <Courses />
        </Form>
      </Formik>
    </div>
  );
};

export default UserProfile;
