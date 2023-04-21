import React, { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import NavSettings from "./NavSettings";
import ConnectionInvite from "./ConnectionInvite";
import { useTranslation } from "react-i18next";
import { notificationType } from "../../Models/UserProfileModel";
import getUserNotifications from "../../http/getUserNotifications";
import ConnectionInviteRead from "./ConnectionInviteRead";
import markNoficationsRead from "../../http/markNotificationsRead";
import getUnreadNotification from "../../http/getUnreadNotifications";
import MessageNotification from "./MessageNotification";
import markSingleNoficationsRead from "../../http/markSingleNotificationRead";

const UserNotifications: React.FC = () => {
  const { t } = useTranslation();

  const [unreadNotifications, setUnreadNotifications] =
    useState<notificationType[]>();

  const [userNotifications, setUserNotifications] =
    useState<notificationType[]>();

  const [viewAll, setViewAll] = useState(false);

  useEffect(() => {
    async function fetchUnreadNotifications() {
      try {
        const unreadNotifications = await getUnreadNotification();
        setUnreadNotifications(unreadNotifications.data.notifications); // get post from the response object
      } catch (error) {
        console.log(error);
      }
    }
    fetchUnreadNotifications();
  }, []);

  useEffect(() => {
    async function fetchUserNotifications() {
      try {
        const userNotifications = await getUserNotifications();
        setUserNotifications(userNotifications.data.notifications); // get post from the response object
      } catch (error) {
        console.log(error);
      }
    }
    fetchUserNotifications();
  }, []);

  const handleBtnClick = (notificationID: string) => {
    markSingleNoficationsRead(notificationID);
    window.location.reload();
  };

  console.log(unreadNotifications);
  console.log(userNotifications);

  return (
    <body className="justify-center bg-[#F7F9FB] py-6 dark:background-dark">
      <div className="lg:flex lg:flex-row justify-center">
        <div className="flex flex-col mr-14">
          <div className="lg:pl-24">
            <NavSettings />
            <Dashboard unreadNotifications={unreadNotifications?.length} />
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-row">
            <hr className="w-1/3 h-px mx-4 my-2 bg-gray-300 border-0 rounded md:my-5 bg-gray-300" />
            <div className="mx-4">{t("notifications.label.recent")}</div>
            <hr className="w-1/3 h-px mx-4 my-2 bg-gray-300 border-0 rounded md:my-5 dark:bg-gray-300" />
          </div>

          <div className="row-span-2 col-span-2">
            {unreadNotifications?.length == 0 ? (
              <div className="mx-9 my-4">
                You have no recent notifications...
              </div>
            ) : (
              userNotifications?.map((notification) => {
                if (
                  notification.isRead == false &&
                  notification.type === "connection"
                ) {
                  return (
                    <ConnectionInvite
                      initiatorID={notification.initiatorID}
                      key={notification._id}
                      notificationID={notification._id}
                      handleBtnClick={handleBtnClick}
                    />
                  );
                } else if (
                  notification.isRead == false &&
                  notification.type === "message"
                ) {
                  return (
                    <MessageNotification
                      initiatorID={notification.initiatorID}
                      key={notification.initiatorID}
                    />
                  );
                }
              })
            )}
          </div>

          <div>
            {unreadNotifications?.length == 0 ? null : (
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm ml-9 w-32 h-8"
                onClick={(e) => {
                  e.preventDefault();
                  markNoficationsRead();
                  window.location.reload();
                }}
              >
                MARK AS READ
              </button>
            )}
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
                {userNotifications?.map((notification) => {
                  if (
                    notification.isRead == true &&
                    notification.type == "connection"
                  ) {
                    return (
                      <ConnectionInviteRead
                        initiatorID={notification.initiatorID}
                        key={notification.initiatorID}
                      />
                    );
                  } else if (
                    notification.isRead == true &&
                    notification.type === "message"
                  ) {
                    return (
                      <MessageNotification
                        initiatorID={notification.initiatorID}
                        key={notification.initiatorID}
                      />
                    );
                  }
                })}
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
