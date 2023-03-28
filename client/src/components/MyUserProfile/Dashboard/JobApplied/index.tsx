import placeholder from "./placeholder.png";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import getPost from "../../../../http/getPost";

interface JobAppliedProps {
  application: string;
}

interface postType {
  _id: string;
  creatorID: string;
  isJobListing: boolean;
  position: string;
  text: string;
  image: string;
  likes: string[];
  comments: {
    commenter: string;
    comment: string;
  }[];
  preferenceTags: { type: string }[];
  uploadDeadline: Date;
  isThirdParty: boolean;
  thirdPartyLink: string;
  isResumeRequired: boolean;
  isCoverLetterRequired: boolean;
  applications: string[];
}

const JobApplied: React.FC<JobAppliedProps> = ({ application }) => {
  // const recruiter = true;
  console.log(application);

  const [postInfo, setPostInfo] = useState<postType>();

  useEffect(() => {
    async function fetchJobPosting(application: any) {
      try {
        if (application === "") return;
        const posting = await getPost(application);
        setPostInfo(posting);
      } catch (error) {
        console.log(error);
      }
    }
    fetchJobPosting(application);
  }, [application]);

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
          {postInfo?.position}
        </a>
        <p className="text-sm">{postInfo?.text}</p>
        {/* <p className="text-sm">Location</p> */}
        <p className="text-sm" style={{ color: "#4c47bc" }}>
          {postInfo?.applications.length} applicants
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
JobApplied.propTypes = { application: PropTypes.string.isRequired };

export default JobApplied;
