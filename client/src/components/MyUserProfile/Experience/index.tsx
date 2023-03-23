import React, { useState } from "react";
import Divider from "@mui/material/Divider";
import { useTranslation } from "react-i18next";


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
  edit: boolean;
}> = ({ experience, edit }) => {
  const [addOrDelete, setAddOrDelete] = useState(false);
  const {t} = useTranslation();

  const addNewBtn = (
    <button
      type="button"
      className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-full my-5"
      onClick={() => {
        experience.push({
          title: "",
          startDate: "",
          endDate: "",
          company: "",
          logo: "",
          location: "",
          description: "",
        });
        // Force form to re-render
        setAddOrDelete(!addOrDelete);
      }}
    >
      {t('userProfile.buttons.addNew')}
    </button>
  );

  const deleteBtn = (index: number) => {
    return (
      <button
        type="button"
        className="bg-red-500 text-white rounded-full px-2 my-2"
        onClick={() => {
          experience.splice(index, 1);
          // Force form to re-render
          setAddOrDelete(!addOrDelete);
        }}
      >
       {t('userProfile.buttons.delete')}
      </button>
    );
  };

  function experienceFields(index: number) {
    return (
      <>
        <label className="text-sm font-semibold text-gray-600 py-2">
          {t('userProfile.label.company')}
        </label>
        <input
          name={`experience[${index}].company`}
          className="w-full rounded-sm"
          type="text"
          defaultValue={experience[index].company || ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            experience[index].company = e.target.value;
          }}
        />
        <label className="text-sm font-semibold text-gray-600 py-2">
          {t('userProfile.label.title')}
        </label>
        <input
          name={`experience[${index}].title`}
          className="w-full rounded-sm"
          type="text"
          defaultValue={experience[index].title || ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            experience[index].title = e.target.value;
          }}
        />
        <label className="text-sm font-semibold text-gray-600 py-2">
          {t('userProfile.label.description')}
        </label>
        <input
          name={`experience[${index}].description`}
          className="w-full rounded-sm"
          type="textarea"
          defaultValue={experience[index].description || ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            experience[index].description = e.target.value;
          }}
        />
        <label className="text-sm font-semibold text-gray-600 py-2">
          {t('userProfile.label.startDate')}
        </label>
        <input
          name={`experience[${index}].startDate`}
          className="w-full rounded-sm"
          type="text"
          defaultValue={experience[index].startDate || ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            experience[index].startDate = e.target.value;
          }}
        />
        <label className="text-sm font-semibold text-gray-600 py-2">
          {t('userProfile.label.endDate')}
        </label>
        <input
          name={`experience[${index}].endDate`}
          className="w-full rounded-sm"
          type="text"
          defaultValue={experience[index].endDate || ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            experience[index].endDate = e.target.value;
          }}
        />
        <label className="text-sm font-semibold text-gray-600 py-2">
          {t('userProfile.label.location')}
        </label>
        <input
          name={`experience[${index}].location`}
          className="w-full rounded-sm"
          type="text"
          defaultValue={experience[index].description || ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            experience[index].description = e.target.value;
          }}
        />
        {deleteBtn(index)}
      </>
    );
  }

  const existingExperience = experience.map((_, index) => {
    return (
      <React.Fragment key={index}>
        <div className="my-5">{experienceFields(index)}</div>
        <Divider />
      </React.Fragment>
    );
  });

  const form = (
    <div className="pt-5">
      {existingExperience}
      {addNewBtn}
    </div>
  );

  const component = edit ? (
    form
  ) : experience.length < 1 ? (
    <p>{t('userProfile.label.addExp')}</p>
  ) : (
    <div className="grid grid-cols-2 gap-4 my-4">
      {experience?.map((experience) => {
        return (
          <div
            key={experience.company}
            className="flex flex-col bg-white rounded-md p-5"
          >
            <h1 className="text-lg font-semibold ">{experience.company}</h1>
            <h2 className="">{t('userProfile.label.position')}: {experience.title}</h2>
            <h3 className="">{experience.description}</h3>
            <h3 className="">{t('userProfile.label.location')}: {experience.location}</h3>
            <h3 className="text-sm ">
              {experience.startDate} → {experience.endDate}
            </h3>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="w-full p-5 rounded-md bg-slate-200 mx-auto">
      <h1 className="text-2xl font-bold ">{t('userProfile.label.experience')}</h1>
      {component}
    </div>
  );
};

export default Experience;
