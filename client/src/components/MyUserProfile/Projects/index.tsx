import React from "react";

const Projects: React.FC<{
  projects: {
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    technologies: string[];
    picture: string;
  }[];
}> = ({ projects }) => {  
  return (
    <div className="w-full p-5 rounded-md bg-slate-200 mx-auto">
      <h1 className="text-2xl font-bold ">Projects</h1>
      {projects.length < 2 ? (
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
                {project.technologies.map((technology, index) => {
                  return <div key={index}>{technology}</div>;
                })}
              </div>

              <img
                className="w-32 h-32 rounded-full border-2 border-white"
                src={project.picture}
                alt="project"
              />
            </div>
          );
        })
      )}
    </div>
  );
};

export default Projects;
