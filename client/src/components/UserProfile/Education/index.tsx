import React from "react";
import Usertypes from "../../../Models/UserProfileModel";
import { useTranslation } from "react-i18next";


const Education: React.FC<{
  education: Usertypes["education"];
}> = ({ education }) => {
  const {t} = useTranslation();

  return (
    <div className="w-full p-5 rounded-md bg-slate-200 mx-auto">
      <h1 className="text-2xl font-bold ">{t('userProfile.label.education')}</h1>
      <div className="grid grid-cols-2 gap-4 my-4">
        {education.map((edu) => {
          return (
            <div
              key={edu.school}
              className="flex flex-col bg-white rounded-md p-5"
            >
              <h1 className="text-lg font-semibold pt-2">{edu.school}</h1>
              <h2 className="">{edu.degree}</h2>
              <h3 className="">{edu.location}</h3>
              <h3 className="">{edu.description}</h3>
              <h3 className="text-sm">
                {edu.startDate} → {edu.endDate}
              </h3>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Education;
