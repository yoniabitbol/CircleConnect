import React from "react";
import Usertypes from "../../../Models/UserProfileModel";

const Awards: React.FC<{ awards: Usertypes["awards"] }> = ({ awards }) => {
  return (
    <div className="w-full p-5 rounded-md bg-slate-200 mx-auto dark:primary-dark">
      <h1 className="text-2xl font-bold ">Awards</h1>
      <div className="grid grid-cols-3 gap-4 my-4">
        {awards.map((award) => {
          return (
            <div
              key={award.title}
              className="flex flex-col bg-white rounded-md p-5 dark:secondary-dark"
            >
              <h1 className="text-lg font-semibold pt-2">{award.title}</h1>
              <h3 className="">Awarded by {award.awarder}</h3>
              <h3 className="">{award.summary}</h3>
              <h2 className="text-sm">{award.date}</h2>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Awards;
