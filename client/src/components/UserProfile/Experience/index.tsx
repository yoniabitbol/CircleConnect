import React from "react";

const Experience: React.FC<{
  experience: {
    company: string;
    logo: string;
    title: string;
    location: string;
    startDate: string;
    endDate: string;
    description: string;
  }[];
}> = ({ experience }) => {
  return (
    <div className="w-full p-5 rounded-md bg-slate-200 mx-auto">
      <h1 className="text-2xl font-bold ">Experience</h1>
      {experience.map((experience, index) => {
        return (
          <div key={index} className="flex flex-col justify-center mb-5">
            <h1 className="text-lg font-semibold pt-2">{experience.company}</h1>
            <h2 className="">{experience.title}</h2>
            <h3 className="pt-2">
              {experience.startDate} -&gt; {experience.endDate}{" "}
            </h3>
            <h3 className="pt-2">{experience.location}</h3>
            <h3 className="pt-2">{experience.description}</h3>
            <img
              className="w-32 h-32 rounded-full border-2 border-white"
              src={experience.logo}
              alt="experience"
            />
          </div>
        );
      })}
    </div>
  );
};

export default Experience;
