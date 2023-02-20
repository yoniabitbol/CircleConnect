import React, { useState } from "react";
import Divider from "@mui/material/Divider";
import Usertypes from "../../../Models/UserProfileModel";

const Education: React.FC<{
  education: Usertypes["education"];
  edit: boolean;
}> = ({ education, edit }) => {
  const [addNew, setAddNew] = useState(false);

  const addNewBtn = (
    <button
      onClick={() => setAddNew(true)}
      className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-full my-5"
    >
      Add new
    </button>
  );

  function educationFields(index: number) {
    return (
      <>
        <label className="text-sm font-semibold text-gray-600 py-2">
          School
        </label>
        <input
          name={`education[${index}].school`}
          className="w-full rounded-sm"
          type="text"
          defaultValue={education[index].school || ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            education[index].school = e.target.value;
          }}
        />
        <label className="text-sm font-semibold text-gray-600 py-2">
          Degree
        </label>
        <input
          name={`education[${index}].degree`}
          className="w-full rounded-sm"
          type="text"
          defaultValue={education[index].degree || ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            education[index].degree = e.target.value;
          }}
        />
        <label className="text-sm font-semibold text-gray-600 py-2">
          Start Date
        </label>
        <input
          name={`education[${index}].startDate`}
          className="w-full rounded-sm"
          type="text"
          defaultValue={education[index].startDate || ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            education[index].startDate = e.target.value;
          }}
        />
        <label className="text-sm font-semibold text-gray-600 py-2">
          End Date
        </label>
        <input
          name={`education[${index}].endDate`}
          className="w-full rounded-sm"
          type="text"
          defaultValue={education[index].endDate || ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            education[index].endDate = e.target.value;
          }}
        />
        <label className="text-sm font-semibold text-gray-600 py-2">
          Location
        </label>
        <input
          name={`education[${index}].location`}
          className="w-full rounded-sm"
          type="text"
          defaultValue={education[index].location || ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            education[index].location = e.target.value;
          }}
        />
        <label className="text-sm font-semibold text-gray-600 py-2">
          Description
        </label>
        <input
          name={`education[${index}].description`}
          className="w-full rounded-sm"
          type="textarea"
          defaultValue={education[index].description || ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            education[index].description = e.target.value;
          }}
        />
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

  const form = addNew ? (
    <div className="pt-5">
      {existingEducation}
      {educationFields(education.length)}
    </div>
  ) : (
    <div>
      {existingEducation}
      {addNewBtn}
    </div>
  );

  const component = edit ? (
    form
  ) : education.length < 2 ? (
    <p>Create at least 2 educations</p>
  ) : (
    <div className="grid grid-cols-2 gap-4 my-4">
      {education.map((edu) => {
        return (
          <div
            key={edu.school}
            className="flex flex-col justify-center bg-white rounded-md p-5"
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
    <div className="w-full p-5 rounded-md bg-slate-200 mx-auto">
      <h1 className="text-2xl font-bold ">Education</h1>
      {component}
    </div>
  );
};

export default Education;
