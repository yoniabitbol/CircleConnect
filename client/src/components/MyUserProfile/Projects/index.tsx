import { Field } from "formik";
import React, { useState } from "react";

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
  const [addNew, setAddNew] = useState(false);

  const addNewBtn = (
    <button
      onClick={() => setAddNew(true)}
      className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-full m-5"
    >
      Add new
    </button>
  );

  const form = addNew ? (
    <div className="w-2/3 mx-auto pt-5">
      <label className="text-sm font-semibold text-gray-600 py-2">Title</label>
      <Field name="projects.title" className="w-full rounded-sm" type="text" />
      <label className="text-sm font-semibold text-gray-600 py-2">
        Description
      </label>
      <Field
        name="projects.description"
        className="w-full rounded-sm"
        type="text"
      />
      <label className="text-sm font-semibold text-gray-600 py-2">
        Start Date
      </label>
      <Field
        name="projects.startDate"
        className="w-full rounded-sm"
        type="text"
      />
      <label className="text-sm font-semibold text-gray-600 py-2">
        End Date
      </label>
      <Field
        name="projects.endDate"
        className="w-full rounded-sm"
        type="text"
      />
      <label className="text-sm font-semibold text-gray-600 py-2">
        Technologies (seperate with a comma)
      </label>
      <Field
        name="projects.technologies"
        className="w-full rounded-sm"
        type="text"
      />
      {/* <label className="text-sm font-semibold text-gray-600 py-2">
        Project picture
      </label>
      <input
        id="file"
        name="projectimg"
        type="file"
        className="w-full rounded-sm"
        onChange={(event) => {
          const file: FileList | null = event.currentTarget.files;
          if (!file) return;
          else {
            formik.setFieldValue("projectimg", file[0]);
          }
        }}
      /> */}
    </div>
  ) : (
    addNewBtn
  );
  
  const component = edit ? (
    form
  ) : projects.length < 2 ? (
    <p>No projects yet</p>
  ) : (
    projects?.map((project, index) => {
      return (
        <div key={index} className="flex flex-col justify-center mb-5">
          <h1 className="text-lg font-semibold pt-2">{project.title}</h1>
          <h2 className="">{project.description}</h2>
          <h3 className="pt-2">
            {project.startDate} -&gt; {project.endDate}{" "}
          </h3>

          <div className="flex space-x-5 pt-2">
            {project.technologies?.split(",").map((technology, index) => {
              return <div key={index}>{technology}</div>;
            })}
          </div>
          {/* 
          <img
            className="w-32 h-32 rounded-full border-2 border-white"
            src={project.picture}
            alt="project"
          /> */}
        </div>
      );
    })
  );

  return (
    <div className="w-full p-5 rounded-md bg-slate-200 mx-auto">
      <h1 className="text-2xl font-bold ">Projects</h1>
      {component}
    </div>
  );
};

export default Projects;
