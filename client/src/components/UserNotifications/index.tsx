import React, { useEffect, useState } from "react";
// import Alert from "./Alert";
import Dashboard from "./Dashboard";
import NavSettings from "./NavSettings";
import ConnectionInvite from "./ConnectionInvite";
import { useTranslation } from "react-i18next";
import getUnreadNotification from "../../http/getUnreadNotifications";
import { notificationType } from "../../Models/UserProfileModel";
// import markNoficationsRead from "../../http/markNotificationsRead";

const UserNotifications: React.FC = () => {
  const { t } = useTranslation();

  const [unreadNotifications, setUnreadNotifications] =
    useState<notificationType[]>();

  useEffect(() => {
    async function fetchUnreadNotifications() {
      try {
        const unreadNotifications = await getUnreadNotification();
        console.log(unreadNotifications);
        setUnreadNotifications(unreadNotifications.data.notifications); // get post from the response object
      } catch (error) {
        console.log(error);
      }
    }
    fetchUnreadNotifications();
  }, []);

  console.log("Unread Notifications Type: " + unreadNotifications);

  return (
    <body
      className="justify-center py-6"
      style={{ backgroundColor: "#F7F9FB" }}
    >
      <div className="lg:flex lg:flex-row justify-center">
        <div className="flex flex-col">
          <div className="lg:pl-24">
            <NavSettings />
            <Dashboard
              views_today="367"
              posts_views="15"
              search_appearances="9"
            />
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-row">
            <hr className="w-1/3 h-px mx-auto my-2 bg-gray-300 border-0 rounded md:my-5 dark:bg-gray-300" />
            <div className="">{t("notifications.label.recent")}</div>
            <hr className="w-1/3 h-px mx-auto my-2 bg-gray-300 border-0 rounded md:my-5 dark:bg-gray-300" />
          </div>

          <div className="row-span-2 col-span-2">
            {unreadNotifications?.map((notification) => {
              if (notification.type === "connection") {
                return (
                  <ConnectionInvite
                    initiatorID={notification.initiatorID}
                    key={notification.initiatorID}
                  />
                );
              } else if (notification.type === "message") {
                return "Message row"; // Change this to react component
              }
            })}
          </div>
        </div>
      </div>
    </body>
  );
};

export default UserNotifications;
