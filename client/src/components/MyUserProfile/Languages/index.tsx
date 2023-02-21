import React, { useState } from "react";
import Divider from "@mui/material/Divider";
import Usertypes from "../../../Models/UserProfileModel";

const Languages: React.FC<{
  languages: Usertypes["languages"];
  edit: boolean;
}> = ({ languages, edit }) => {
  const [addOrDelete, setAddOrDelete] = useState(false);

  const addNewBtn = (
    <button
      type="button"
      className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-full my-5"
      onClick={() => {
        languages.push({ name: "", level: "" });
        // Force form to re-render
        setAddOrDelete(!addOrDelete);
        console.log(languages);
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
          languages.splice(index, 1);
          // Force form to re-render
          setAddOrDelete(!addOrDelete);
        }}
      >
        Delete
      </button>
    );
  };

  function languageFields(index: number) {
    return (
      <>
        <label className="text-sm font-semibold text-gray-600 py-2">
          Language
        </label>
        <input
          name={`languages[${index}].name`}
          className="w-full rounded-sm"
          type="text"
          defaultValue={languages[index].name || ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            languages[index].name = e.target.value;
          }}
        />
        <label className="text-sm font-semibold text-gray-600 py-2">
          Level
        </label>
        <input
          name={`languages[${index}].level`}
          className="w-full rounded-sm"
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
  ) : languages.length < 2 ? (
    <p>Add at least 2 languages</p>
  ) : (
    <div className="grid grid-cols-3 gap-4 my-4">
      {languages?.map((language) => {
        return (
          <div
            key={language.name}
            className="flex flex-col bg-white rounded-md p-5"
          >
            <h1 className="text-lg font-semibold pt-2">{language.name}</h1>
            <h2 className="">
              Level <span className="font-bold">{language.level}</span>
            </h2>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="w-full p-5 rounded-md bg-slate-200 mx-auto">
      <h1 className="text-2xl font-bold ">Languages</h1>
      {component}
    </div>
  );
};

export default Languages;
