import React from "react";

const Education: React.FC<{
  education: {
    school: string;
    logo: string;
    degree: string;
    location: string;
    startDate: string;
    endDate: string;
    description: string;
  }[];
}> = ({ education }) => {
  return (
    <div className="lg:w-2/3 w-4/5 m-5 p-5 rounded-md bg-slate-200 mx-auto">
      <h1 className="text-2xl font-bold ">Education</h1>
      {education.map((ed, index) => {
        return (
          <div key={index} className="flex flex-col justify-center mb-5">
            <h1 className="text-lg font-semibold pt-2">{ed.school}</h1>
            <h2 className="">{ed.degree}</h2>
            <h3 className="pt-2">
              {ed.startDate} -&gt; {ed.endDate}
            </h3>
            <h3 className="pt-2">{ed.location}</h3>
            <h3 className="pt-2">{ed.description}</h3>
            <img
              className="w-32 h-32 rounded-full border-2 border-white"
              src={ed.logo}
              alt="experience"
            />
          </div>
        );
      })}
    </div>
  );
};

export default Education;
