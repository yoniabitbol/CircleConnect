import { useState } from "react";
import ApplicantRow from "./ApplicantRow";
import placeholder from "./placeholder.png";
import getPost from "../../../../http/getPost";
import { useEffect } from "react";
import PropTypes from "prop-types";
import { applicationType, postType } from "../../../../Models/UserProfileModel";
import getUserProfile from "../../../../http/getUserProfile";
import Usertypes from "../../../../Models/UserProfileModel";

interface JobPostingProps {
  post: postType;
}

const JobPosting: React.FC<JobPostingProps> = ({ post }) => {
  const [postInfo, setPostInfo] = useState<postType>();
  const [applicantsInfo, setApplicantsInfo] = useState<Usertypes[]>();
  // console.log(applicantsInfo);

  useEffect(() => {
    async function fetchJobPosting(post: postType) {
      try {
        if (post === null) return;
        const posting = await getPost(post._id);
        setPostInfo(posting.data.post); // get post from the response object
      } catch (error) {
        console.log(error);
      }
    }
    fetchJobPosting(post);
  }, [post]);

  useEffect(() => {
    async function fetchUserProfile(postInfo: postType) {
      const applicants = await Promise.all(
        postInfo.applications.map(async (eachApplicant: applicationType) => {
          const applicant = await getUserProfile(eachApplicant.applicantID);
          return applicant.data.user;
        })
      );
      setApplicantsInfo(applicants);
    }
    if (postInfo) fetchUserProfile(postInfo);
  }, [post.applications]);

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
        <p className="text-sm">{postInfo?.text}</p>
        {/* <p className="text-sm">Location</p> */}
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
            {applicantsInfo?.map((applicant: Usertypes) => (
              <div key={applicant.name}>
                <ApplicantRow applicant={applicant.name} />
              </div>
            ))}

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
