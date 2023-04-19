import React, { useState } from "react";
import Divider from "@mui/material/Divider";
import { useTranslation } from "react-i18next";
import {Button} from '@mui/material';

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
  const [addOrDelete, setAddOrDelete] = useState(false);
  const {t} = useTranslation();

  const addNewBtn = (
    <Button
      type="button"
      disableElevation={true}
        variant="contained"
      sx={{mt:2}}
      onClick={() => {
        projects.push({
          title: "",
          description: "",
          startDate: "",
          endDate: "",
          technologies: "",
          picture: "",
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
          projects.splice(index, 1);
          // Force form to re-render
          setAddOrDelete(!addOrDelete);
        }}
      >
       {t('userProfile.buttons.delete')}
      </button>
    );
  };

  const projectFields = (index: number) => {
    return (
      <>
        <label className="text-sm font-semibold py-2">
          {t('userProfile.label.title')}
        </label>
        <input
          name={`projects[${index}].title`}
          className="w-full rounded-sm dark:secondary-dark  p-2 outline-none"
          type="text"
          defaultValue={projects[index].title || ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            projects[index].title = e.target.value;
          }}
        />

        <label className="text-sm font-semibold  py-2">
          {t('userProfile.label.description')}
        </label>
        <input
          name={`projects[${index}].description`}
          className="w-full rounded-sm dark:secondary-dark  p-2 outline-none"
          type="textarea"
          defaultValue={projects[index].description || ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            projects[index].description = e.target.value;
          }}
        />
        <label className="text-sm font-semibold py-2">
          {t('userProfile.label.startDate')}
        </label>
        <input
          name={`projects[${index}].startDate`}
          className="w-full rounded-sm dark:secondary-dark  p-2 outline-none"
          type="text"
          defaultValue={projects[index].startDate || ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            projects[index].startDate = e.target.value;
          }}
        />
        <label className="text-sm font-semibold py-2">
          {t('userProfile.label.endDate')}
        </label>
        <input
          name={`projects[${index}].endDate`}
          className="w-full rounded-sm dark:secondary-dark  p-2 outline-none"
          type="text"
          defaultValue={projects[index].endDate || ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            projects[index].endDate = e.target.value;
          }}
        />
        <label className="text-sm font-semibold py-2">
          Technologies (seperate with a comma)
        </label>
        <input
          name={`projects[${index}].technologies`}
          className="w-full rounded-sm dark:secondary-dark  p-2 outline-none"
          type="text"
          defaultValue={projects[index].technologies || ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            projects[index].technologies = e.target.value;
          }}
        />
        <label className="text-sm font-semibold py-2">
        {t('userProfile.label.picture')}
        </label>
        <input
          name={`projects[${index}].picture`}
          className="w-full rounded-sm dark:secondary-dark  p-2 outline-none"
          type="text"
          disabled={true}
          // defaultValue={projects[index].picture || ""}
          defaultValue={"Coming soon!"}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            projects[index].picture = e.target.value;
          }}
        />
        {deleteBtn(index)}
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

  const form = (
    <div className="pt-5">
      {existingProjects}
      {addNewBtn}
    </div>
  );

  const component = edit ? (
    form
  ) : projects.length < 1 ? (
    <p>{t('userProfile.label.addProject')}</p>
  ) : (
    <div className="grid grid-cols-2 gap-4 my-4 ">
      {projects?.map((project) => {
        return (
          <div
            key={project.title}
            className="flex flex-col bg-white rounded-md p-5 dark:secondary-dark"
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
    <div className="w-full p-5 rounded-md bg-slate-200 mx-auto dark:primary-dark">
      <h1 className="text-2xl font-bold "> {t('userProfile.label.project')}</h1>
      {component}
    </div>
  );
};

export default Projects;
