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
import RelatedPost from "./RelatedPost";
import RelatedPostRead from "./RelatedPostRead";

const UserNotifications: React.FC = () => {
  const { t } = useTranslation();

  const [unreadNotifications, setUnreadNotifications] =
    useState<notificationType[]>();

  const [userNotifications, setUserNotifications] =
    useState<notificationType[]>();

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
  }, [unreadNotifications?.length]);

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
  }, [userNotifications?.length]);

  const handleBtnClick = (notificationID: string) => {
    // handle connection invite Accept or Decline
    markSingleNoficationsRead(notificationID);
    window.location.reload();
  };

  return (
    <body className="justify-center bg-[#F7F9FB] py-6 dark:background-dark">
      <div className="lg:flex lg:flex-row justify-center">
        <div className="flex flex-col mr-28">
          <div className="sm: ml-6">
            <NavSettings />
            <Dashboard unreadNotifications={unreadNotifications?.length} />
          </div>
        </div>
        <div className="flex flex-col ml-0">
          <div className="flex flex-row">
            <hr className="w-1/3 h-px mx-4 my-2 bg-gray-300 border-0 rounded md:my-5 bg-gray-300" />
            <div className="mx-4">{t("notifications.label.recent")}</div>
            <hr className="w-1/3 h-px mx-4 my-2 bg-gray-300 border-0 rounded md:my-5 dark:bg-gray-300" />
          </div>

          <div className="justify-center">
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
                        key={notification.id}
                        notificationID={notification.id}
                        handleBtnClick={handleBtnClick}
                      />
                    );
                  } else if (notification.type === "message") {
                    return (
                      <MessageNotification
                        initiatorID={notification.initiatorID}
                        key={notification.id}
                      />
                    );
                  } else if (notification.type === "relatedPost") {
                    return (<RelatedPost 
                      initiatorID={notification.initiatorID} 
                      key={notification.id} 
                      notificationID={notification.id} 
                      handleBtnClick={handleBtnClick}/>)
                  }
                })
              )}
            </div>
            {unreadNotifications?.length == 0 ? null : (
              <button
                type="submit"
                className="bg-indigo-600 mt-2 mb-4 hover:bg-indigo-700 text-white rounded-md text-sm ml-9 w-32 h-8"
                onClick={(e) => {
                  e.preventDefault();
                  markNoficationsRead();
                  window.location.reload();
                }}
              >
                MARK AS READ
              </button>
            )}
          </div>

          <div>
            <div className="flex flex-row">
              <hr className="w-1/3 h-px mx-4 my-2 bg-gray-300 border-0 rounded md:my-5 bg-gray-300" />
              <div className="mx-4">{"PREVIOUS"}</div>
              <hr className="w-1/3 h-px mx-4 my-2 bg-gray-300 border-0 rounded md:my-5 dark:bg-gray-300" />
            </div>
            {userNotifications?.length == 0 ? (
              <div className="mx-9 my-4">
                You have no previous notifications...
              </div>
            ) : (
              <div>
                {userNotifications?.map((notification) => {
                  if (
                    notification.isRead == true &&
                    notification.type === "connection"
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
                  } else if (notification.type === "relatedPost") {
                    return (<RelatedPostRead 
                      initiatorID={notification.initiatorID} 
                      key={notification.id} 
                    />)
                  }
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </body>
  );
};

export default UserNotifications;
