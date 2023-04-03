import React from "react";
import placeholder from "./placeholder.png";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import getPost from "../../../../http/getPost";

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

interface JobAppliedProps {
  application: postType;
}

const JobApplied: React.FC<JobAppliedProps> = ({ application }) => {
  // const recruiter = true;
  //console.log("APPLIED: ", application._id);

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

  console.log("APPLICATION ", application);

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
        <p className="text-sm">{application._id}</p>
        <p className="text-sm" style={{ color: "#4c47bc" }}>
          {postInfo?.applications.length} 0 applicants
        </p>
        <div className="flex">
          <button
            onClick={(e) => {
              e.preventDefault();
            }}
            className="text-sm block mt-2 w-auto px-3 py-1 rounded-md bg-signup-button
          text-white hover:bg-signup-button-hover"
          >
            {/*t('jobApplied.buttons.viewApplication')*/}
          </button>

          <button
            onClick={(e) => {
              e.preventDefault();
            }}
            className="text-sm block mt-2 ml-2 w-auto px-3 py-1 rounded-md bg-red-500
          text-white hover:bg-red-700"
          >
            {/*t('jobApplied.buttons.delete')*/}
          </button>
        </div>
      </div>
    </div>
  );
};
JobApplied.propTypes = { application: PropTypes.any.isRequired };

export default JobApplied;
