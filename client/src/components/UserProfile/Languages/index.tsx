import React from "react";
import Usertypes from "../../../Models/UserProfileModel";

const Languages: React.FC<{
  languages: Usertypes["languages"];
}> = ({ languages }) => {
  return (
    <div className="w-full p-5 rounded-md bg-slate-200 mx-auto">
      <h1 className="text-2xl font-bold ">Languages</h1>
      <div className="grid grid-cols-3 gap-4 my-4">
        {languages?.map((language) => {
          return (
            <div
              key={language.name}
              className="flex flex-col bg-white rounded-md p-5"
            >
              <h1 className="text-lg font-semibold pt-2">{language.name}</h1>
              <h2 className="">
                Level <span className="font-bold">{language.level}</span>
              </h2>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Languages;
