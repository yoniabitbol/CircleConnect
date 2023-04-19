import React from "react";

const Skills: React.FC<{
  skills: {
    name: string;
    level: string;
  }[];
}> = ({ skills }) => {
  return (
    <div className="w-full p-5 rounded-md bg-slate-200 mx-auto dark:primary-dark">
      <h1 className="text-2xl font-bold ">Skills</h1>
      <div className="grid grid-cols-3 gap-4 my-4">
        {skills?.map((skill) => {
          return (
            <div
              key={skill.name}
              className="flex flex-col bg-white rounded-md p-5 dark:secondary-dark"
            >
              <h1 className="text-lg font-semibold pt-2">{skill.name}</h1>
              <h2 className="">
                Level <span className="font-bold">{skill.level}</span>
              </h2>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Skills;
