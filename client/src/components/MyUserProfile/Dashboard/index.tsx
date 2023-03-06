import JobPosting from "./JobPosting";

const Dashboard: React.FC = () => {
  const recruiter = false;
  return (
    <div>
      <div className="w-full p-5 rounded-md bg-slate-200 mx-auto">
        {recruiter ? (
          <h1>Job posted by you:</h1>
        ) : (
          <h1>Jobs you applied to:</h1>
        )}
        <JobPosting />
        <JobPosting />
        <JobPosting />
        <JobPosting />
        <JobPosting />
        <JobPosting />
      </div>
    </div>
  );
};

export default Dashboard;
