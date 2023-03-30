import JobPosting from "./JobPosting";
import JobApplied from "./JobApplied";
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

interface DashboardProps {
  posts: postType[];
  applications: string[];
}

const Dashboard: React.FC<DashboardProps> = ({ posts, applications }) => {
  return (
    <div>
      <div className="w-full p-5 rounded-md bg-slate-200 mx-auto">
        Jobs you posted:
        {posts.map((post: postType) => (
          <div key={post._id}>
            <JobPosting post={post} />
          </div>
        ))}
      </div>
      <div className="mt-2 w-full p-5 rounded-md bg-slate-200 mx-auto">
        Jobs you applied to:
        {applications.map((application: string) => (
          <div key={application}>
            <JobApplied application={application} />
          </div>
        ))}
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.any).isRequired,
  applications: PropTypes.array.isRequired,
};

export default Dashboard;
