import JobPosting from "./JobPosting";

const Dashboard: React.FC = () => {
  return (
    <div className="w-full p-5 rounded-md bg-slate-200 mx-auto">
      <JobPosting />
      <JobPosting />
      <JobPosting />
      <JobPosting />
      <JobPosting />
      <JobPosting />
    </div>
  );
};

export default Dashboard;
