import { Field } from "formik";
import React, { useState } from "react";
import Divider from "@mui/material/Divider";

const Projects: React.FC<{
  projects: {
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    technologies: string;
    picture: string;
  }[];
  edit: boolean;
  formik: any;
}> = ({ projects, edit }) => {
  // console.log(projects);

  const [addNew, setAddNew] = useState(false);

  const addNewBtn = (
    <button
      onClick={() => setAddNew(true)}
      className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-full my-5"
    >
      Add new
    </button>
  );

  function projectFields(index: number) {
    return (
      <>
        <label className="text-sm font-semibold text-gray-600 py-2">
          Title
        </label>
        <Field
          name={`projects[${index}].title`}
          className="w-full rounded-sm"
          type="text"
          as="input"
        />
        <label className="text-sm font-semibold text-gray-600 py-2">
          Description
        </label>
        <Field
          name={`projects[${index}].description`}
          className="w-full rounded-sm"
          type="text"
          as="input"
        />
        <label className="text-sm font-semibold text-gray-600 py-2">
          Start Date
        </label>
        <Field
          name={`projects[${index}].startDate`}
          className="w-full rounded-sm"
          type="text"
          as="input"
        />
        <label className="text-sm font-semibold text-gray-600 py-2">
          End Date
        </label>
        <Field
          name={`projects[${index}].endDate`}
          className="w-full rounded-sm"
          type="text"
          as="input"
        />
        <label className="text-sm font-semibold text-gray-600 py-2">
          Technologies (seperate with a comma)
        </label>
        <Field
          as="input"
          name={`projects[${index}].technologies`}
          className="w-full rounded-sm"
          type="text"
        />
      </>
    );
  }

  const existingProjects = projects.map((proj, index) => {
    return (
      <>
        <div key={proj.title} className="my-5">
          {projectFields(index)}
        </div>
        <Divider />
      </>
    );
  });

  const form = addNew ? (
    <div className="pt-5">
      {existingProjects}
      {projectFields(projects.length)}
    </div>
  ) : (
    <div>
      {existingProjects}
      {addNewBtn}
    </div>
  );

  const component = edit ? (
    form
  ) : projects.length < 2 ? (
    <p>Create at least 2 projects</p>
  ) : (
    <div className="grid grid-cols-3 gap-4 my-4">
      {projects?.map((project) => {
        return (
          <div
            key={project.title}
            className="flex flex-col justify-center bg-white rounded-md p-5"
          >
            <h1 className="text-lg font-semibold pt-2">{project.title}</h1>
            <h2 className="">{project.description}</h2>
            <h4 className="">
              {project.startDate} → {project.endDate}
            </h4>

            <div className="flex flex-wrap gap-2 pt-2">
              {project.technologies?.split(",").map((technology) => {
                return (
                  <div
                    key={technology}
                    className="rounded-md bg-slate-500 hover:bg-slate-700 px-2"
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
      <h1 className="text-2xl font-bold ">Projects</h1>
      {component}
    </div>
  );
};

export default Projects;
