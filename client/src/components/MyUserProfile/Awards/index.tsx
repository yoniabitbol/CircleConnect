import React from "react";
import Usertypes from "../../../Models/UserProfileModel";

const Awards: React.FC<{ awards: Usertypes["awards"]; edit: boolean }> = ({
  awards,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  edit,
}) => {
  return (
    <div className="w-full p-5 rounded-md bg-slate-200 mx-auto">
      <h1 className="text-2xl font-bold ">Awards</h1>
      {awards.map((award, index) => {
        return (
          <div key={index} className="flex flex-col justify-center mb-5">
            <h1 className="text-lg font-semibold pt-2">{award.title}</h1>
            <h2 className="">{award.date}</h2>
            <h3 className="pt-2">Awarded by {award.awarder}</h3>
            <h3 className="pt-2">{award.summary}</h3>
          </div>
        );
      })}
    </div>
  );
};

export default Awards;
