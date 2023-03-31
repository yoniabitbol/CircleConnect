import Divider from "@mui/material/Divider";
import React, { useState } from "react";
import Usertypes from "../../../Models/UserProfileModel";
import { useTranslation } from "react-i18next";

const Awards: React.FC<{ awards: Usertypes["awards"]; edit: boolean }> = ({
  awards,
  edit,
}) => {
  const {t} = useTranslation();
  const [addOrDelete, setAddOrDelete] = useState(false);

  const addNewBtn = (
    <button
      type="button"
      className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-full my-5"
      onClick={() => {
        awards.push({ title: "", date: "", awarder: "", summary: "" });
        // Force form to re-render
        setAddOrDelete(!addOrDelete);
      }}
    >
      {t('userProfile.buttons.addNew')}
    </button>
  );

  const deleteBtn = (index: number) => {
    return (
      <button
        type="button"
        className="bg-red-500 text-white rounded-full px-2 my-2"
        onClick={() => {
          awards.splice(index, 1);
          // Force form to re-render
          setAddOrDelete(!addOrDelete);
        }}
      >
         {t('userProfile.buttons.delete')}
      </button>
    );
  };

  function awardFields(index: number) {
    return (
      <>
        <label className="text-sm font-semibold text-gray-600 py-2">
        {t('userProfile.label.award')}
        </label>
        <input
          name={`awards[${index}].title`}
          className="w-full rounded-sm"
          type="text"
          defaultValue={awards[index].title || ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            awards[index].title = e.target.value;
          }}
        />
        <label className="text-sm font-semibold text-gray-600 py-2">{t('userProfile.label.date')}</label>
        <input
          name={`awards[${index}].date`}
          className="w-full rounded-sm"
          type="text"
          defaultValue={awards[index].date || ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            awards[index].date = e.target.value;
          }}
        />
        <label className="text-sm font-semibold text-gray-600 py-2">
        {t('userProfile.label.awarder')}
        </label>
        <input
          name={`awards[${index}].awarder`}
          className="w-full rounded-sm"
          type="text"
          defaultValue={awards[index].awarder || ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            awards[index].awarder = e.target.value;
          }}
        />
        <label className="text-sm font-semibold text-gray-600 py-2">
          {t('userProfile.label.summary')}
        </label>
        <input
          name={`awards[${index}].summary`}
          className="w-full rounded-sm"
          type="textarea"
          defaultValue={awards[index].summary || ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            awards[index].summary = e.target.value;
          }}
        />
        {deleteBtn(index)}
      </>
    );
  }

  const existingawards = awards.map((_, index) => {
    return (
      <React.Fragment key={index}>
        <div className="my-5">{awardFields(index)}</div>
        <Divider />
      </React.Fragment>
    );
  });

  const form = (
    <div className="pt-5">
      {existingawards}
      {addNewBtn}
    </div>
  );

  const component = edit ? (
    form
  ) : awards.length < 1 ? (
    <p>{t('userProfile.label.addAward')}</p>
  ) : (
    <div className="grid grid-cols-3 gap-4 my-4">
      {awards.map((award) => {
        return (
          <div
            key={award.title}
            className="flex flex-col bg-white rounded-md p-5"
          >
            <h1 className="text-lg font-semibold pt-2">{award.title}</h1>
            <h3 className="">{t('userProfile.label.awardedBy')} {award.awarder}</h3>
            <h3 className="">{award.summary}</h3>
            <h2 className="text-sm">{award.date}</h2>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="w-full p-5 rounded-md bg-slate-200 mx-auto">
      <h1 className="text-2xl font-bold ">{t('userProfile.label.awards')}</h1>
      {component}
    </div>
  );
};

export default Awards;
