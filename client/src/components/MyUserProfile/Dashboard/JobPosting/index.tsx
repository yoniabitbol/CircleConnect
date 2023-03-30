import { useState } from "react";
import ApplicantRow from "./ApplicantRow";
import placeholder from "./placeholder.png";
import getPost from "../../../../http/getPost";
import { useEffect } from "react";
import PropTypes from "prop-types";

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
  createdAt: string;
  updatedAt: string;
}

interface JobPostingProps {
  post: postType;
}

const JobPosting: React.FC<JobPostingProps> = ({ post }) => {
  const [postInfo, setPostInfo] = useState<postType>();

  console.log(postInfo);

  useEffect(() => {
    async function fetchJobPosting(post: any) {
      try {
        if (post === "") return;
        const posting = await getPost(post);
        setPostInfo(posting);
      } catch (error) {
        console.log(error);
      }
    }
    fetchJobPosting(post._id);
  }, [post]);

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
        <a href="/" className="font-bold"></a>
        <p className="text-sm">{post._id}</p>
        <p className="text-sm">Location</p>
        <p className="text-sm" style={{ color: "#4c47bc" }}>
          {/*t("jobPosted.label.applicants")*/}
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
            {/*t("jobPosted.buttons.allApplicants")*/}
          </button>
        ) : (
          <p></p>
        )}

        {showApplicants ? (
          <div className="text-sm mt-2">
            <h3> {/*t("jobPosted.label.applicantList")*/}</h3>
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
              {/*t("jobPosted.buttons.close")*/}
            </button>
          </div>
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
};

JobPosting.propTypes = { post: PropTypes.any.isRequired };

export default JobPosting;
