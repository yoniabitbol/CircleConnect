import { Field } from "formik";
import React, { useState } from "react";
import Divider from "@mui/material/Divider";

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
  const [addNew, setAddNew] = useState(false);

  const addNewBtn = (
    <button
      onClick={() => setAddNew(true)}
      className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-full my-5"
    >
      Add new
    </button>
  );

  function experienceFields(index: number) {
    return (
      <>
        <label className="text-sm font-semibold text-gray-600 py-2">
          Company
        </label>
        <Field
          name={`experience[${index}].company`}
          className="w-full rounded-sm"
          type="text"
          as="input"
        />
        <label className="text-sm font-semibold text-gray-600 py-2">
          Title
        </label>
        <Field
          name={`experience[${index}].title`}
          className="w-full rounded-sm"
          type="text"
          as="input"
        />
        <label className="text-sm font-semibold text-gray-600 py-2">
          Description
        </label>
        <Field
          name={`experience[${index}].description`}
          className="w-full rounded-sm"
          type="text"
          as="input"
        />
        <label className="text-sm font-semibold text-gray-600 py-2">
          Start Date
        </label>
        <Field
          name={`experience[${index}].startDate`}
          className="w-full rounded-sm"
          type="text"
          as="input"
        />
        <label className="text-sm font-semibold text-gray-600 py-2">
          End Date
        </label>
        <Field
          name={`experience[${index}].endDate`}
          className="w-full rounded-sm"
          type="text"
          as="input"
        />
        <label className="text-sm font-semibold text-gray-600 py-2">
          Location
        </label>
        <Field
          as="input"
          name={`experience[${index}].location`}
          className="w-full rounded-sm"
          type="text"
        />
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

  const form = addNew ? (
    <div className="pt-5">
      {existingExperience}
      {experienceFields(experience.length)}
    </div>
  ) : (
    <div>
      {existingExperience}
      {addNewBtn}
    </div>
  );

  const component = edit ? (
    form
  ) : experience.length < 2 ? (
    <p>Add at least 2 work/volunteer/... experiences</p>
  ) : (
    <div className="grid grid-cols-2 gap-4 my-4">
      {experience?.map((experience) => {
        return (
          <div
            key={experience.company}
            className="flex flex-col justify-center bg-white rounded-md p-5"
          >
            <h1 className="text-lg font-semibold ">{experience.company}</h1>
            <h2 className="">Position: {experience.title}</h2>
            <h3 className="">{experience.description}</h3>
            <h3 className="">Location: {experience.location}</h3>
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
      <h1 className="text-2xl font-bold ">Experience</h1>
      {component}
    </div>
  );
};

export default Experience;
