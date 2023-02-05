import React from "react";
import { Usertypes } from "..";

const Languages: React.FC<{
  languages: Usertypes["languages"];
}> = ({ languages }) => {
  return (
    <div className="lg:w-2/3 w-4/5 m-5 p-5 rounded-md bg-slate-200 mx-auto">
      <h1 className="text-2xl font-bold ">Languages</h1>
      {languages.map((language, index) => {
        return (
          <div key={index} className="flex flex-col justify-center mb-5">
            <h1 className="text-lg font-semibold pt-2">{language.name}</h1>
            <h2 className="">{language.level}</h2>
          </div>
        );
      })}
    </div>
  );
};

export default Languages;
