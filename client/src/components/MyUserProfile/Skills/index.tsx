import React, { useState } from "react";
import Divider from "@mui/material/Divider";
import { useTranslation } from "react-i18next";
import {Button} from '@mui/material';

const Skills: React.FC<{
  skills: {
    name: string;
    level: string;
  }[];
  edit: boolean;
}> = ({ skills, edit }) => {
  const {t} = useTranslation();
  // console.log(`Skills: \n${JSON.stringify(skills)}`);
  const [addOrDelete, setAddOrDelete] = useState(false);

  const addNewBtn = (
    <Button
      type="button"
      variant="contained"
        disableElevation={true}
        sx={{mt:2}}
      onClick={() => {
        skills.push({ name: "", level: "" });
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
          skills.splice(index, 1);
          // Force form to re-render
          setAddOrDelete(!addOrDelete);
        }}
      >
        {t('userProfile.buttons.delete')}
      </button>
    );
  };

  function skillFields(index: number) {
    return (
      <>
        <label className="text-sm font-semibold py-2">
        {t('userProfile.label.skill')}
        </label>
        <input
          name={`skills[${index}].name`}
          className="w-full rounded-sm dark:secondary-dark  p-2 outline-none"
          type="text"
          defaultValue={skills[index].name || ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            skills[index].name = e.target.value;
          }}
        />
        <label className="text-sm font-semibold py-2">
          Level
        </label>
        <input
          name={`skills[${index}].level`}
          className="w-full rounded-sm dark:secondary-dark  p-2 outline-none"
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
  ) : skills.length < 1 ? (
    <p> {t('userProfile.label.addSkill')}</p>
  ) : (
    <div className="grid grid-cols-3 gap-4 my-4">
      {skills?.map((skill) => {
        return (
          <div
            key={skill.name}
            className="flex flex-col bg-white rounded-md p-5 dark:primary-dark"
          >
            <h1 className="text-lg font-semibold pt-2">{skill.name}</h1>
            <h2 className="">
            {t('userProfile.label.level')} <span className="font-bold">{skill.level}</span>
            </h2>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="w-full p-5 rounded-md bg-slate-200 mx-auto dark:primary-dark">
      <h1 className="text-2xl font-bold ">{t('userProfile.label.skills')}</h1>
      {component}
    </div>
  );
};

export default Skills;
