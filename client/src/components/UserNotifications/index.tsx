import React from "react";
import Alerts from "./Alerts";
import Dashboard from "./Dashboard";
import NavSettings from "./NavSettings";

const UserNotifications: React.FC = () => {
  return (
    
    <div className="grid grid-rows-4 grid-flow-col">
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
      <div className="row-span-1 col-span-2 flex justify-center">
        <hr className="w-1/3 h-0.5 mx-auto my-2 bg-gray-100 border-0 rounded md:my-5 dark:bg-gray-300"/>
        <div className="">RECENT</div>
        <hr className="w-1/3 h-0.5 mx-auto my-2 bg-gray-100 border-0 rounded md:my-5 dark:bg-gray-300"/>
      </div>
      <div className="row-span-2 col-span-2">
        <Alerts
          type="Alert"
          description="Samuel Jackson accepted your connection request"
          time="3 hours"
        />
      </div>
    </div>
  );
};

export default UserNotifications;