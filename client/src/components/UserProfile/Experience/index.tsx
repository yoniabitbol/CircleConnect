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
      <div className="grid grid-cols-2 gap-4 my-4">
        {experience?.map((experience) => {
          return (
            <div
              key={experience.company}
              className="flex flex-col bg-white rounded-md p-5"
            >
              <h1 className="text-lg font-semibold ">{experience.company}</h1>
              <h2 className="">Position: {experience.title}</h2>
              <h3 className="">{experience.description}</h3>
              <h3 className="">Location: {experience.location}</h3>
              <h3 className="text-sm ">
                {experience.startDate} → {experience.endDate}
              </h3>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Experience;
