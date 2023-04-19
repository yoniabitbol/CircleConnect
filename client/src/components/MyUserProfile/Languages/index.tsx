import React, { useState } from "react";
import Divider from "@mui/material/Divider";
import Usertypes from "../../../Models/UserProfileModel";
import { useTranslation } from "react-i18next";
import {Button} from '@mui/material';

const Languages: React.FC<{
  languages: Usertypes["languages"];
  edit: boolean;
}> = ({ languages, edit }) => {
  const {t} = useTranslation();
  const [addOrDelete, setAddOrDelete] = useState(false);

  const addNewBtn = (
    <Button
      type="button"
        disableElevation={true}
        variant="contained"
        sx={{mt:2}}
      onClick={() => {
        languages.push({ name: "", level: "" });
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
          languages.splice(index, 1);
          // Force form to re-render
          setAddOrDelete(!addOrDelete);
        }}
      >
        {t('userProfile.buttons.delete')}
      </button>
    );
  };

  function languageFields(index: number) {
    return (
      <>
        <label className="text-sm font-semibold  py-2">
        {t('userProfile.label.language')}
        </label>
        <input
          name={`languages[${index}].name`}
          className="w-full rounded-sm dark:secondary-dark  p-2 outline-none"
          type="text"
          defaultValue={languages[index].name || ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            languages[index].name = e.target.value;
          }}
        />
        <label className="text-sm font-semibold  py-2">
          {t('userProfile.label.level')}
        </label>
        <input
          name={`languages[${index}].level`}
          className="w-full rounded-sm dark:secondary-dark  p-2 outline-none"
          type="text"
          defaultValue={languages[index].level || ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            languages[index].level = e.target.value;
          }}
        />
        {deleteBtn(index)}
      </>
    );
  }

  const existingLanguages = languages.map((_, index) => {
    return (
      <React.Fragment key={index}>
        <div className="my-5">{languageFields(index)}</div>
        <Divider />
      </React.Fragment>
    );
  });

  const form = (
    <div className="pt-5">
      {existingLanguages}
      {addNewBtn}
    </div>
  );

  const component = edit ? (
    form
  ) : languages.length < 1 ? (
    <p>{t('userProfile.label.addLang')}</p>
  ) : (
    <div className="grid grid-cols-3 gap-4 my-4">
      {languages?.map((language) => {
        return (
          <div
            key={language.name}
            className="flex flex-col bg-white rounded-md p-5 dark:secondary-dark"
          >
            <h1 className="text-lg font-semibold pt-2">{language.name}</h1>
            <h2 className="">
            {t('userProfile.label.level')} <span className="font-bold">{language.level}</span>
            </h2>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="w-full p-5 rounded-md bg-slate-200 mx-auto dark:primary-dark">
      <h1 className="text-2xl font-bold ">{t('userProfile.label.languages')}</h1>
      {component}
    </div>
  );
};

export default Languages;
