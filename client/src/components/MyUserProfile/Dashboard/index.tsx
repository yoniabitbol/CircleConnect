import JobPosting from "./JobPosting";
import JobApplied from "./JobApplied";
import { useTranslation } from "react-i18next";
import React from "react";

const Dashboard: React.FC = () => {
  const {t} = useTranslation();
  return (
    <div>
      <div className="w-full p-5 rounded-md bg-slate-200 mx-auto">
        Jobs you posted:
        <JobPosting />
        <JobPosting />
        <JobPosting />
      </div>
      <div className="mt-2 w-full p-5 rounded-md bg-slate-200 mx-auto">
        {t('jobApplied.label.appliedTo')} 
        <JobApplied />
        <JobApplied />
        <JobApplied />
      </div>
    </div>
  );
};

export default Dashboard;
