import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { applicationType, postType } from "../../../../Models/UserProfileModel";
import getPost from "../../../../http/getPost";
import getCoverLetter from "../../../../http/getCoverLetter";
import getResume from "../../../../http/getResume";
import withdrawFromPost from "../../../../http/withdrawFromPost";

interface JobAppliedProps {
  application: applicationType;
}

const JobApplied: React.FC<JobAppliedProps> = ({ application }) => {
  const [postInfo, setPostInfo] = useState<postType>();

  const [coverletter, setCoverletter] = useState<string | undefined>(undefined);
  const [resume, setResume] = useState<string | undefined>(undefined);

  useEffect(() => {
    getCoverLetter(application.coverLetter).then((res) => {
      if (res) setCoverletter(res);
      else setCoverletter(undefined);
    });
    getResume(application.resume).then((res) => {
      if (res) setResume(res);
      else setResume(undefined);
    });
  }, []);

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
  }, []);

  return (
    <div className="flex bg-white mt-2 dark:secondary-dark">
      <div className="grow ml-4 py-2">
        <p className="text-md" style={{ color: "#4c47bc" }}>
          {postInfo?.position}
        </p>
        <p className="text-sm">
          No. of applicants: {postInfo?.applications.length}
        </p>
        <div className="flex my-2">
          {coverletter ? (
            <a
              href={coverletter}
              download
              className="text-xs block w-auto px-3 py-1 rounded-md bg-signup-button
          text-white hover:bg-signup-button-hover mr-3"
            >
              View Cover Letter
            </a>
          ) : null}
          {resume ? (
            <a
              href={resume}
              download
              className="text-xs block w-auto px-3 py-1 rounded-md bg-signup-button
          text-white hover:bg-signup-button-hover mr-3"
            >
              View Resume
            </a>
          ) : null}

          <button
            onClick={(e) => {
              e.preventDefault();
              withdrawFromPost(application._id);
              window.location.reload();
            }}
            className="text-xs block w-auto px-3 py-1 rounded-md bg-red-500
            text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
JobApplied.propTypes = { application: PropTypes.any.isRequired };

export default JobApplied;
