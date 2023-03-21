import JobPosting from "./JobPosting";
import JobApplied from "./JobApplied";

const Dashboard: React.FC = () => {
  return (
    <div>
      <div className="w-full p-5 rounded-md bg-slate-200 mx-auto">
        Jobs you posted:
        <JobPosting />
        <JobPosting />
        <JobPosting />
      </div>
      <div className="mt-2 w-full p-5 rounded-md bg-slate-200 mx-auto">
        Jobs you applied to:
        <JobApplied />
        <JobApplied />
        <JobApplied />
      </div>
    </div>
  );
};

export default Dashboard;
