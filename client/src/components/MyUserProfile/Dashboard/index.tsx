import JobPosting from "./JobPosting";
import JobApplied from "./JobApplied";
import { Schema } from "mongoose";

interface DashboardProps {
  posts: Schema.Types.ObjectId[];
  applications: Schema.Types.ObjectId[];
}

const Dashboard: React.FC<DashboardProps> = ({ posts, applications }) => {
  return (
    <div>
      <div className="w-full p-5 rounded-md bg-slate-200 mx-auto">
        Jobs you posted:
        {posts.map((post: Schema.Types.ObjectId) => (
          <div key={post.toString()}>
            <JobPosting post={post} />
          </div>
        ))}
      </div>
      <div className="mt-2 w-full p-5 rounded-md bg-slate-200 mx-auto">
        Jobs you applied to:
        {applications.map((application: Schema.Types.ObjectId) => (
          <div key={application.toString()}>
            <JobApplied application={application} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
