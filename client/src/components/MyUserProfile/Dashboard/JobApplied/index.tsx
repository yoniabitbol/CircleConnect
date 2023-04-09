import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { applicationType, postType } from "../../../../Models/UserProfileModel";
import getPost from "../../../../http/getPost";

interface JobAppliedProps {
  application: applicationType;
}

const JobApplied: React.FC<JobAppliedProps> = ({ application }) => {
  const [postInfo, setPostInfo] = useState<postType>();

  useEffect(() => {
    async function fetchJobPosting(postID: string) {
      try {
        if (postID === null) return;
        const posting = await getPost(postID);
        setPostInfo(posting.data.post); // get post from the response object
      } catch (error) {
        console.log(error);
      }
    }
    fetchJobPosting(application.postID);
  }, [1]);

  console.log("POSTINFO: ", postInfo);

  return (
    <div className="flex bg-white mt-2">
      <div className="grow ml-4 py-2">
        <a href="/" className="font-bold">
          {postInfo?.text}
        </a>
        {/* <p className="text-sm">{postInfo?.text}</p> */}

        <p className="text-sm" style={{ color: "#4c47bc" }}>
          {postInfo?.position}
        </p>
        <p className="text-sm">
          No. of applicants: {postInfo?.applications.length}
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
