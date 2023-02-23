import React from "react";

const Projects: React.FC<{
  projects: {
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    technologies: string;
    picture: string;
  }[];
}> = ({ projects }) => {
  return (
    <div className="w-full p-5 rounded-md bg-slate-200 mx-auto">
      <h1 className="text-2xl font-bold ">Projects</h1>
      <div className="grid grid-cols-2 gap-4 my-4">
        {projects?.map((project) => {
          return (
            <div
              key={project.title}
              className="flex flex-col bg-white rounded-md p-5"
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
    </div>
  );
};

export default Projects;
