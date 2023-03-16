import JobPosting from "./JobPosting";

import Usertypes from "../../../Models/UserProfileModel";
import JobApplied from "./JobApplied";

const Dashboard: React.FC<{
  applications: Usertypes["applications"];
}> = ({}) => {
  // const recruiter = true;
  return (
    <div>
      <div className="w-full p-5 rounded-md bg-slate-200 mx-auto">
        <JobPosting />
        <JobPosting />
        <JobPosting />
      </div>
      <div className="mt-2 w-full p-5 rounded-md bg-slate-200 mx-auto">
        <JobApplied />
        <JobApplied />
        <JobApplied />
      </div>
    </div>
  );
};

export default Dashboard;
