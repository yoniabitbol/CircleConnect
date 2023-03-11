import { useState } from "react";
import ApplicantRow from "./ApplicantRow";
import placeholder from "./placeholder.png";

const JobPosting: React.FC = () => {
  const recruiter = true;
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
          Job Title
        </a>
        <p className="text-sm">Company Name</p>
        <p className="text-sm">Location</p>
        <p className="text-sm" style={{ color: "#4c47bc" }}>
          0 applicants
        </p>
        {recruiter && !showApplicants ? (
          <button
            onClick={(e) => {
              e.preventDefault();
              setShowApplicants(true);
            }}
            className="text-sm block mt-2 w-auto px-3 py-1 rounded-md bg-signup-button
          text-white hover:bg-signup-button-hover"
          >
            See all applicants
          </button>
        ) : (
          <p></p>
        )}
        {!recruiter ? (
          <div className="flex">
            <button
              onClick={(e) => {
                e.preventDefault();
              }}
              className="text-sm block mt-2 w-auto px-3 py-1 rounded-md bg-signup-button
          text-white hover:bg-signup-button-hover"
            >
              View application
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
              }}
              className="text-sm block mt-2 ml-2 w-auto px-3 py-1 rounded-md bg-red-500
          text-white hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        ) : (
          <p></p>
        )}
        {showApplicants ? (
          <div className="text-sm mt-2">
            <h3>Applicants:</h3>
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
              Close
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
