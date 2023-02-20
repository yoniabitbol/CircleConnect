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

  const projectFields = (index: number) => {
    return (
      <>
        <label className="text-sm font-semibold text-gray-600 py-2">
          Title
        </label>
        <input
          name={`projects[${index}].title`}
          className="w-full rounded-sm"
          type="text"
          defaultValue={projects[index].title || ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            projects[index].title = e.target.value;
          }}
        />

        <label className="text-sm font-semibold text-gray-600 py-2">
          Description
        </label>
        <input
          name={`projects[${index}].description`}
          className="w-full rounded-sm"
          type="text"
          defaultValue={projects[index].description || ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            projects[index].description = e.target.value;
          }}
        />
        <label className="text-sm font-semibold text-gray-600 py-2">
          Start Date
        </label>
        <input
          name={`projects[${index}].startDate`}
          className="w-full rounded-sm"
          type="text"
          defaultValue={projects[index].startDate || ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            projects[index].startDate = e.target.value;
          }}
        />
        <label className="text-sm font-semibold text-gray-600 py-2">
          End Date
        </label>
        <input
          name={`projects[${index}].endDate`}
          className="w-full rounded-sm"
          type="text"
          defaultValue={projects[index].endDate || ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            projects[index].endDate = e.target.value;
          }}
        />
        <label className="text-sm font-semibold text-gray-600 py-2">
          Technologies (seperate with a comma)
        </label>
        <input
          name={`projects[${index}].technologies`}
          className="w-full rounded-sm"
          type="text"
          defaultValue={projects[index].technologies || ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            projects[index].technologies = e.target.value;
          }}
        />
        <label className="text-sm font-semibold text-gray-600 py-2">
          Picture
        </label>
        <input
          name={`projects[${index}].picture`}
          className="w-full rounded-sm"
          type="text"
          disabled={true}
          // defaultValue={projects[index].picture || ""}
          defaultValue={"Coming soon!"}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            projects[index].picture = e.target.value;
          }}
        />
      </>
    );
  };

  const existingProjects = projects.map((_, index) => {
    return (
      <React.Fragment key={index}>
        <div className="my-5">{projectFields(index)}</div>
        <Divider />
      </React.Fragment>
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
    <div className="grid grid-cols-2 gap-4 my-4">
      {projects?.map((project) => {
        return (
          <div
            key={project.title}
            className="flex flex-col justify-center bg-white rounded-md p-5"
          >
            <h1 className="text-lg font-semibold pt-2">{project.title}</h1>
            <h2 className="">{project.description}</h2>
            <h4 className="text-sm">
              {project.startDate} → {project.endDate}
            </h4>

            <div className="flex flex-wrap gap-2 pt-2">
              {project.technologies?.split(",").map((technology) => {
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
      <h1 className="text-2xl font-bold ">Projects</h1>
      {component}
    </div>
  );
};

export default Projects;
