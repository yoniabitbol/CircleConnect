import React from "react";
import Alert from "./Alert";
import Dashboard from "./Dashboard";
import NavSettings from "./NavSettings";
import ConnectionInvite from "./ConnectionInvite";

const UserNotifications: React.FC = () => {
  return (
    <body className="justify-center" style={{ backgroundColor: "#F7F9FB" }}>
      <div className="lg:flex lg:flex-row justify-center mt-6">
        <div className="flex flex-col">
          <NavSettings />
          <Dashboard
            views_today="367"
            posts_views="15"
            search_appearances="9"
          />
        </div>
        <div className="flex flex-col">
          <div className="flex flex-row justify-center">
            <hr className="w-1/4 h-0.5 mx-auto my-2 bg-gray-100 border-0 rounded md:my-5 dark:bg-gray-300" />
            <div className="">RECENT</div>
            <hr className="w-1/4 h-0.5 mx-auto my-2 bg-gray-100 border-0 rounded md:my-5 dark:bg-gray-300" />
          </div>
          <div className="row-span-2 col-span-2">
            <Alert
              type="Alert"
              description="Samuel Jackson accepted your connection request"
              time={3}
            />
            <ConnectionInvite
              name="Brandon Wilson"
              job_title="Senior UX Designer"
              connections={623}
              connection_message="Hey, I saw your works. I like it! Can we do something together? Or maybe you have project for UX at the moment?"
            />
            <Alert
              type="Alert"
              description="Audrey Alexander and 10 others viewed your profile"
              time={9}
            />
            <Alert
              type="Alert"
              description="We found jobs that you may be interested"
              time={15}
            />
          </div>
        </div>
      </div>
    </body>
  );
};

export default UserNotifications;
