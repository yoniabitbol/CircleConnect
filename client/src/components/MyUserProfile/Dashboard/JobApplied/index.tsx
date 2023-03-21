import placeholder from "./placeholder.png";
import { Schema } from "mongoose";

interface JobAppliedProps {
  application: Schema.Types.ObjectId;
}

const JobApplied: React.FC<JobAppliedProps> = ({ application }) => {
  // const recruiter = true;
  console.log(application);
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
      </div>
    </div>
  );
};

export default JobApplied;
