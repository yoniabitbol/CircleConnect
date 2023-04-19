import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Dashboard: React.FC<{
  unreadNotifications: number | undefined;
}> = (props) => {
  const { t } = useTranslation();
  const { unreadNotifications } = props;
  return (
    <div className="my-4 py-5 rounded-md bg-white dark:secondary-dark">
      <div className="flex flex-col justify-center mb-2">
        <div className="flex justify-around text-sm">
          <h1 className="">{t("notifications.label.dashboard")}</h1>
          <Link
            to="/profile"
            className="underline decoration-solid text-[#4B47B7] dark:text-[#706CC3]"
          >
            {t("notifications.label.stats")}
          </Link>
        </div>
        <hr className="w-full h-px mx-auto my-2 bg-gray-200 border-0 rounded md:my-5 dark:bg-gray-300" />
        {unreadNotifications === 0 ? (
          <div className="px-4">You are up-to-date!</div>
        ) : (
          <div className="px-6">
            <h1 className="text-5xl font-semibold" style={{ color: "#4B47B7" }}>
              {unreadNotifications}
            </h1>
            <h1 className="">{"Unread Notifications"}</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
