import JobPosting from "./JobPosting";
import JobApplied from "./JobApplied";
import PropTypes from "prop-types";
import { applicationType, postType } from "../../../Models/UserProfileModel";

interface DashboardProps {
  posts: postType[];
  applications: applicationType[];
}

const Dashboard: React.FC<DashboardProps> = ({ posts, applications }) => {
  return (
    <div>
      <div className="w-full p-5 rounded-md bg-slate-200 mx-auto">
        Jobs you posted:
        {posts.map((post: postType) => (
          <div key={post._id}>
            {post.isJobListing ? <JobPosting post={post} /> : null}
          </div>
        ))}
      </div>
      <div className="mt-2 w-full p-5 rounded-md bg-slate-200 mx-auto">
        Jobs you applied to:
        {applications.map((application: applicationType) => (
          <div key={application._id}>
            <JobApplied application={application} />
          </div>
        ))}
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.any).isRequired,
  applications: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default Dashboard;
