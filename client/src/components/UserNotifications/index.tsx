import React from "react";
import Alerts from "./Alerts";
import Dashboard from "./Dashboard";

const UserNotifications: React.FC = () => {
  return (
    <div className="grid grid-rows-3 grid-flow-col">
      <div className="row-span-3">
        <Dashboard
          views_today="367"
          posts_views="15"
          search_appearances="9"
        />
      </div>
      <div className="col-span-2 flex justify-center">RECENT</div>
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