import { useState } from "react";
import ApplicantRow from "./ApplicantRow";
import placeholder from "./placeholder.png";
import { Schema } from "mongoose";
import getPost from "../../../../http/getPost";
import { useEffect } from "react";

interface JobPostingProps {
  post: Schema.Types.ObjectId;
}

interface postType {
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
  applications: Schema.Types.ObjectId[];
}

const JobPosting: React.FC<JobPostingProps> = ({ post }) => {
  const [postInfo, setPostInfo] = useState("");

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
    fetchJobPosting(post);
  }, [post]);

  const [showApplicants, setShowApplicants] = useState(false);
  console.log(post.toString());
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
        <p className="text-sm">Company Name</p>
        <p className="text-sm">Location</p>
        <p className="text-sm" style={{ color: "#4c47bc" }}>
          0 applicants
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
            See all applicants
          </button>
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
