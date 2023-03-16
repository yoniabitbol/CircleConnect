import JobPosting from "./JobPosting";

import Usertypes from "../../../Models/UserProfileModel";
import JobApplied from "./JobApplied";

const Dashboard: React.FC<{
  applications: Usertypes["applications"];
}> = ({ applications }) => {
  console.log("Hey: " + applications);

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
