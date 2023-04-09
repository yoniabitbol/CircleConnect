import { useState } from "react";
import ApplicantRow from "./ApplicantRow";
import getPost from "../../../../http/getPost";
import { useEffect } from "react";
import PropTypes from "prop-types";
import { applicationType, postType } from "../../../../Models/UserProfileModel";
import getUserProfile from "../../../../http/getUserProfile";
import Usertypes from "../../../../Models/UserProfileModel";
import DownloadCV from "./DownloadCV";

interface JobPostingProps {
  post: postType;
}

const JobPosting: React.FC<JobPostingProps> = ({ post }) => {
  const [postInfo, setPostInfo] = useState<postType>();
  const [applicantsInfo, setApplicantsInfo] = useState<Usertypes[]>();

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
  });

  return (
    <div className="flex bg-white mt-2">
      <div className="grow py-2 ml-4">
        <a href="/" className="font-bold"></a>
        <p className="text-sm">{postInfo?.text}</p>

        {applicantsInfo && applicantsInfo.length != 0 ? (
          <p className="text-sm mt-2 " style={{ color: "#4c47bc" }}>
            Applicants:
          </p>
        ) : null}
        <div className="text-sm mt-2">
          {applicantsInfo?.map((applicant: Usertypes) => (
            <div key={applicant.name}>
              <div className="mt-2 lg:text-xs mr-3 bg-input-purple px-2 py-2">
                <ApplicantRow applicant={applicant.name} />
                <DownloadCV applicant={applicant} postID={postInfo?._id} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

JobPosting.propTypes = { post: PropTypes.any.isRequired };

export default JobPosting;
