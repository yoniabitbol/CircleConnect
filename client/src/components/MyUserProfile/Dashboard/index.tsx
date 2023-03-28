import JobPosting from "./JobPosting";
import JobApplied from "./JobApplied";
import PropTypes from "prop-types";

interface DashboardProps {
  posts: string[];
  applications: string[];
}

const Dashboard: React.FC<DashboardProps> = ({ posts, applications }) => {
  return (
    <div>
      <div className="w-full p-5 rounded-md bg-slate-200 mx-auto">
        Jobs you posted:
        {posts.map((post: string) => (
          <div key={post}>
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
  posts: PropTypes.array.isRequired,
  applications: PropTypes.array.isRequired,
};

export default Dashboard;
