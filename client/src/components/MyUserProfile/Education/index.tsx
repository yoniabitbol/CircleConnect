import React, { useState } from "react";
import Divider from "@mui/material/Divider";
import Usertypes from "../../../Models/UserProfileModel";
import { useTranslation } from "react-i18next";
import {Button} from '@mui/material';

const Education: React.FC<{
  education: Usertypes["education"];
  edit: boolean;
}> = ({ education, edit }) => {
  const [addOrDelete, setAddOrDelete] = useState(false);
  const {t} = useTranslation();

  const addNewBtn = (
    <Button
      type="button"
        disableElevation={true}
        variant="contained"
        sx={{mt:2}}
      onClick={() => {
        education.push({
          school: "",
          logo: "",
          degree: "",
          location: "",
          startDate: "",
          endDate: "",
          description: "",
        });
        // Force form to re-render
        setAddOrDelete(!addOrDelete);
      }}
    >
       {t('userProfile.buttons.addNew')}
    </Button>
  );

  const deleteBtn = (index: number) => {
    return (
      <button
        type="button"
        className="bg-red-500 text-white rounded-full px-2 my-2"
        onClick={() => {
          education.splice(index, 1);
          // Force form to re-render
          setAddOrDelete(!addOrDelete);
        }}
      >
       {t('userProfile.buttons.delete')}
      </button>
    );
  };

  function educationFields(index: number) {
    return (
      <>
        <label className="text-sm font-semibold  py-2">
         {t('userProfile.label.school')}
        </label>
        <input
          name={`education[${index}].school`}
          className="w-full rounded-sm dark:secondary-dark  p-2 outline-none"
          type="text"
          defaultValue={education[index].school || ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            education[index].school = e.target.value;
          }}
        />
        <label className="text-sm font-semibold  py-2">
        {t('userProfile.label.degree')}
        </label>
        <input
          name={`education[${index}].degree`}
          className="w-full rounded-sm dark:secondary-dark  p-2 outline-none"
          type="text"
          defaultValue={education[index].degree || ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            education[index].degree = e.target.value;
          }}
        />
        <label className="text-sm font-semibold  py-2">
          {t('userProfile.label.startDate')}
        </label>
        <input
          name={`education[${index}].startDate`}
          className="w-full rounded-sm dark:secondary-dark  p-2 outline-none"
          type="text"
          defaultValue={education[index].startDate || ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            education[index].startDate = e.target.value;
          }}
        />
        <label className="text-sm font-semibold  py-2">
          {t('userProfile.label.endDate')}
        </label>
        <input
          name={`education[${index}].endDate`}
          className="w-full rounded-sm dark:secondary-dark  p-2 outline-none"
          type="text"
          defaultValue={education[index].endDate || ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            education[index].endDate = e.target.value;
          }}
        />
        <label className="text-sm font-semibold  py-2">
        {t('userProfile.label.location')}
        </label>
        <input
          name={`education[${index}].location`}
          className="w-full rounded-sm dark:secondary-dark  p-2 outline-none"
          type="text"
          defaultValue={education[index].location || ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            education[index].location = e.target.value;
          }}
        />
        <label className="text-sm font-semibold  py-2">
          {t('userProfile.label.description')}
        </label>
        <input
          name={`education[${index}].description`}
          className="w-full rounded-sm dark:secondary-dark  p-2 outline-none"
          type="textarea"
          defaultValue={education[index].description || ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            education[index].description = e.target.value;
          }}
        />
        {deleteBtn(index)}
      </>
    );
  }

  const existingEducation = education.map((_, index) => {
    return (
      <React.Fragment key={index}>
        <div className="my-5">{educationFields(index)}</div>
        <Divider />
      </React.Fragment>
    );
  });

  const form = (
    <div>
      {existingEducation}
      {addNewBtn}
    </div>
  );

  const component = edit ? (
    form
  ) : education.length < 1 ? (
    <p>{t('userProfile.label.addSchool')}</p>
  ) : (
    <div className="grid grid-cols-2 gap-4 my-4">
      {education.map((edu) => {
        return (
          <div
            key={edu.school}
            className="flex flex-col bg-white rounded-md p-5 dark:secondary-dark"
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
  );

  return (
    <div className="w-full p-5 rounded-md bg-slate-200 mx-auto dark:primary-dark">
      <h1 className="text-2xl font-bold ">{t('userProfile.label.education')}</h1>
      {component}
    </div>
  );
};

export default Education;
