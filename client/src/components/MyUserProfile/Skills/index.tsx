import React, { useState } from "react";
import Divider from "@mui/material/Divider";

const Skills: React.FC<{
  skills: {
    name: string;
    level: string;
  }[];
  edit: boolean;
}> = ({ skills, edit }) => {
  const [addOrDelete, setAddOrDelete] = useState(false);

  const addNewBtn = (
    <button
      type="button"
      className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-full my-5"
      onClick={() => {
        skills.push({ name: "", level: "" });
        // Force form to re-render
        setAddOrDelete(!addOrDelete);
      }}
    >
      Add new
    </button>
  );

  const deleteBtn = (index: number) => {
    return (
      <button
        type="button"
        className="bg-red-500 text-white rounded-full px-2 my-2"
        onClick={() => {
          skills.splice(index, 1);
          // Force form to re-render
          setAddOrDelete(!addOrDelete);
        }}
      >
        Delete
      </button>
    );
  };

  function skillFields(index: number) {
    return (
      <>
        <label className="text-sm font-semibold text-gray-600 py-2">
          Skill
        </label>
        <input
          name={`skills[${index}].name`}
          className="w-full rounded-sm"
          type="text"
          defaultValue={skills[index].name || ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            skills[index].name = e.target.value;
          }}
        />
        <label className="text-sm font-semibold text-gray-600 py-2">
          Level
        </label>
        <input
          name={`skills[${index}].level`}
          className="w-full rounded-sm"
          type="text"
          defaultValue={skills[index].level || ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            skills[index].level = e.target.value;
          }}
        />
        {deleteBtn(index)}
      </>
    );
  }

  const existingskills = skills.map((_, index) => {
    return (
      <React.Fragment key={index}>
        <div className="my-5">{skillFields(index)}</div>
        <Divider />
      </React.Fragment>
    );
  });

  const form = (
    <div className="pt-5">
      {existingskills}
      {addNewBtn}
    </div>
  );

  const component = edit ? (
    form
  ) : skills.length < 2 ? (
    <p>Add at least 2 skills</p>
  ) : (
    <div className="grid grid-cols-3 gap-4 my-4">
      {skills?.map((skill) => {
        return (
          <div
            key={skill.name}
            className="flex flex-col justify-center bg-white rounded-md p-5"
          >
            <h1 className="text-lg font-semibold pt-2">{skill.name}</h1>
            <h2 className="">
              Level <span className="font-bold">{skill.level}</span>
            </h2>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="w-full p-5 rounded-md bg-slate-200 mx-auto">
      <h1 className="text-2xl font-bold ">Skills</h1>
      {component}
    </div>
  );
};

export default Skills;
