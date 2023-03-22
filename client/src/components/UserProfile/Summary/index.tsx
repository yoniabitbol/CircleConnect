import React from "react";
import { useTranslation } from "react-i18next";

const Summary: React.FC<{
  summary: string;
}> = ({ summary }) => {
  const {t} = useTranslation();

  return (
    <div className="w-full p-5 rounded-md bg-slate-200 mx-auto">
      <h1 className="text-2xl font-bold ">{t('userProfile.label.about')}</h1>
      {summary}
    </div>
  );
};

export default Summary;
