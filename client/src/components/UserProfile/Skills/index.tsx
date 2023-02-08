import React from "react";

const Skills: React.FC<{
  skills: {
    name: string;
    level: string;
  }[];
}> = ({ skills }) => {
  return (
    <div className="w-full p-5 rounded-md bg-slate-200 mx-auto">
      <h1 className="text-2xl font-bold ">Skills</h1>
      {skills?.map((skill, index) => {
        return (
          <div key={index} className="flex flex-col justify-center mb-5">
            <h1 className="text-lg font-semibold pt-2">{skill.name}</h1>
            <h2 className="">{skill.level}</h2>
          </div>
        );
      })}
    </div>
  );
};

export default Skills;
