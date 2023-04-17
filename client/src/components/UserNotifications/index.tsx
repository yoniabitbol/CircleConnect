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

  const [viewAll, setViewAll] = useState(false);

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
            <hr className="w-1/3 h-px mx-4 my-2 bg-gray-300 border-0 rounded md:my-5 dark:bg-gray-300" />
            <div className="mx-4">{t("notifications.label.recent")}</div>
            <hr className="w-1/3 h-px mx-4 my-2 bg-gray-300 border-0 rounded md:my-5 dark:bg-gray-300" />
          </div>

          <div className="row-span-2 col-span-2">
            {unreadNotifications?.length == 0 ? (
              <div className="mx-9 my-4">
                You have no recent notifications...
              </div>
            ) : (
              unreadNotifications?.map((notification) => {
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
              })
            )}
          </div>

          <div>
            {!viewAll ? (
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm mx-9 w-24 h-8"
                onClick={(e) => {
                  e.preventDefault();
                  setViewAll(true);
                }}
              >
                VIEW ALL
              </button>
            ) : (
              <div>
                <div>Old notifications</div>
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm mx-9 my-4 w-24 h-8"
                  onClick={(e) => {
                    e.preventDefault();
                    setViewAll(false);
                  }}
                >
                  CLOSE
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </body>
  );
};

export default UserNotifications;
