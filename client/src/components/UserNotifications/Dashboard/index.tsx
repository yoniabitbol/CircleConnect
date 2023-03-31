import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Dashboard: React.FC<{
  views_today: string;
  posts_views: string;
  search_appearances: string;
}> = (props) => {
  const {t} = useTranslation();
  const { views_today, posts_views, search_appearances } = props;
  return (
    <div className="my-4 py-5 rounded-md bg-white">
      <div className="flex flex-col justify-center mb-2">
        <div className="flex justify-around text-sm">
          <h1 className="">{t('notifications.label.dashboard')}</h1>
          <Link
            to="/profile"
            style={{ color: "#4B47B7" }}
            className="underline decoration-solid"
          >
            {t('notifications.label.stats')}
          </Link>
        </div>
        <hr className="w-full h-px mx-auto my-2 bg-gray-200 border-0 rounded md:my-5 dark:bg-gray-300" />
        <div className="px-6">
          <h1 className="text-5xl font-semibold" style={{ color: "#4B47B7" }}>
            {views_today}
          </h1>
          <h1 className="">{t('notifications.label.viewsToday')}</h1>
          <h2 className="text-5xl font-semibold" style={{ color: "#4B47B7" }}>
            {posts_views}
          </h2>
          <h2 className="">{t('notifications.label.postViews')}</h2>
          <h3 className="text-5xl font-semibold" style={{ color: "#4B47B7" }}>
            {search_appearances}
          </h3>
          <h3 className="">{t('notifications.label.searchAppearance')}</h3>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
