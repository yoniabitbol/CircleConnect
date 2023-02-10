import React from "react";
import Alert from "./Alert";
import Dashboard from "./Dashboard";
import NavSettings from "./NavSettings";
import ConnectionInvite from "./ConnectionInvite";

const UserNotifications: React.FC = () => {
  return (
    <div className="grid grid-rows-4 grid-flow-col flex justify-center mt-6">
      <div className="row-span-1">
        <NavSettings />
      </div>
      <div className="row-span-3">
        <Dashboard
          views_today="367"
          posts_views="15"
          search_appearances="9"
        />
      </div>
      <div className="h-1/6 row-span-1 col-span-2 flex justify-center">
        <hr className="w-1/3 h-0.5 mx-auto my-2 bg-gray-100 border-0 rounded md:my-5 dark:bg-gray-300"/>
        <div className="">RECENT</div>
        <hr className="w-1/3 h-0.5 mx-auto my-2 bg-gray-100 border-0 rounded md:my-5 dark:bg-gray-300"/>
      </div>
      <div className="row-span-2 col-span-2">
        <Alert
          type="Alert"
          description="Samuel Jackson accepted your connection request"
          time="3 hours"
        />
        <ConnectionInvite
          name="Brandon Wilson"
          job_title="Senior UX Designer"
          connections={623}
          connection_message="Hey, I saw your works. I like it! Can we do something together? Or maybe you have project for UX at the moment?"
          />
      </div>
    </div>
  );
};

export default UserNotifications;