import { Field } from "formik";
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
          Title
        </label>
        <Field
          name={`educations[${index}].title`}
          className="w-full rounded-sm"
          type="text"
          as="input"
        />
        <label className="text-sm font-semibold text-gray-600 py-2">
          Description
        </label>
        <Field
          name={`educations[${index}].description`}
          className="w-full rounded-sm"
          type="text"
          as="input"
        />
        <label className="text-sm font-semibold text-gray-600 py-2">
          Start Date
        </label>
        <Field
          name={`educations[${index}].startDate`}
          className="w-full rounded-sm"
          type="text"
          as="input"
        />
        <label className="text-sm font-semibold text-gray-600 py-2">
          End Date
        </label>
        <Field
          name={`educations[${index}].endDate`}
          className="w-full rounded-sm"
          type="text"
          as="input"
        />
        <label className="text-sm font-semibold text-gray-600 py-2">
          Technologies (seperate with a comma)
        </label>
        <Field
          as="input"
          name={`educations[${index}].technologies`}
          className="w-full rounded-sm"
          type="text"
        />
        <label className="text-sm font-semibold text-gray-600 py-2">
          Picture
        </label>
        <Field
          name={`educations[${index}].picture`}
          className="w-full rounded-sm"
          type="text"
          as="input"
        />
      </>
    );
  }

  const existingeducations = educations.map((_, index) => {
    return (
      <React.Fragment key={index}>
        <div className="my-5">{educationFields(index)}</div>
        <Divider />
      </React.Fragment>
    );
  });

  const form = addNew ? (
    <div className="pt-5">
      {existingeducations}
      {educationFields(educations.length)}
    </div>
  ) : (
    <div>
      {existingeducations}
      {addNewBtn}
    </div>
  );

  const component = edit ? (
    form
  ) : educations.length < 2 ? (
    <p>Create at least 2 educations</p>
  ) : (
    <div className="grid grid-cols-2 gap-4 my-4">
      {educations?.map((education) => {
        return (
          <div
            key={education.title}
            className="flex flex-col justify-center bg-white rounded-md p-5"
          >
            <h1 className="text-lg font-semibold pt-2">{education.title}</h1>
            <h2 className="">{education.description}</h2>
            <h4 className="text-sm">
              {education.startDate} → {education.endDate}
            </h4>

            <div className="flex flex-wrap gap-2 pt-2">
              {education.technologies?.split(",").map((technology) => {
                return (
                  <div
                    key={technology}
                    className="rounded-md bg-slate-500 px-2"
                  >
                    {technology}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="w-full p-5 rounded-md bg-slate-200 mx-auto">
      <h1 className="text-2xl font-bold ">Education</h1>
      {education.map((ed, index) => {
        return (
          <div key={index} className="flex flex-col justify-center mb-5">
            <h1 className="text-lg font-semibold pt-2">{ed.school}</h1>
            <h2 className="">{ed.degree}</h2>
            <h3 className="pt-2">
              {ed.startDate} -&gt; {ed.endDate}
            </h3>
            <h3 className="pt-2">{ed.location}</h3>
            <h3 className="pt-2">{ed.description}</h3>
            <img
              className="w-32 h-32 rounded-full border-2 border-white"
              src={ed.logo}
              alt="experience"
            />
          </div>
        );
      })}
    </div>
  );
};

export default Education;
