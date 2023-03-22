import React from "react";
import placeholder from "./placeholder.png";
import { useTranslation } from "react-i18next";


const JobApplied: React.FC = () => {
  const {t} = useTranslation();
  // const recruiter = true;
  return (
    <div className="flex bg-white mt-2">
      <div className="ml-2 mr-4 my-3">
        <img
          src={placeholder}
          className="w-16 rounded-full md:align-center"
        ></img>
      </div>
      <div className="grow py-2">
        <a href="/" className="font-bold">
          {t('jobApplied.buttons.jobTitle')}
        </a>
        <p className="text-sm">
          {t('jobApplied.label.companyName')} 
          </p>
        <p className="text-sm">
          {t('jobApplied.label.location')}
        </p>
        <p className="text-sm" style={{ color: "#4c47bc" }}>
          {t('jobApplied.label.applicants')}
        </p>
        <div className="flex">
          <button
            onClick={(e) => {
              e.preventDefault();
            }}
            className="text-sm block mt-2 w-auto px-3 py-1 rounded-md bg-signup-button
          text-white hover:bg-signup-button-hover"
          >
            {t('jobApplied.buttons.viewApplication')}
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
            }}
            className="text-sm block mt-2 ml-2 w-auto px-3 py-1 rounded-md bg-red-500
          text-white hover:bg-red-700"
          >
              {t('jobApplied.buttons.delete')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobApplied;
