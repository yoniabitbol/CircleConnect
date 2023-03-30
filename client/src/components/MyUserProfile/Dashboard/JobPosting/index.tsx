import { useState } from "react";
import ApplicantRow from "./ApplicantRow";
import placeholder from "./placeholder.png";
import { useTranslation } from "react-i18next";

const JobPosting: React.FC = () => {
  const {t} = useTranslation();

  // const recruiter = true;
  const [showApplicants, setShowApplicants] = useState(false);

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
        {t('jobPosted.buttons.jobTitle')} 
        </a>
        <p className="text-sm">  {t('jobPosted.label.companyName')} </p>
        <p className="text-sm">{t('jobPosted.label.location')}</p>
        <p className="text-sm" style={{ color: "#4c47bc" }}>
        {t('jobPosted.label.applicants')}
        </p>
        {!showApplicants ? (
          <button
            onClick={(e) => {
              e.preventDefault();
              setShowApplicants(true);
            }}
            className="text-sm block mt-2 w-auto px-3 py-1 rounded-md bg-signup-button
          text-white hover:bg-signup-button-hover"
          >
           {t('jobPosted.buttons.allApplicants')}
          </button>
        ) : (
          <p></p>
        )}

        {showApplicants ? (
          <div className="text-sm mt-2">
            <h3> {t('jobPosted.label.applicantList')}</h3>
            <ul>
              <ApplicantRow />
              <ApplicantRow />
              <ApplicantRow />
            </ul>
            <button
              onClick={(e) => {
                e.preventDefault();
                setShowApplicants(false);
              }}
              className="text-sm block mt-2 w-auto px-3 py-1 rounded-md bg-signup-button
            text-white hover:bg-signup-button-hover"
            >
               {t('jobPosted.buttons.close')}
            </button>
          </div>
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
};

export default JobPosting;
