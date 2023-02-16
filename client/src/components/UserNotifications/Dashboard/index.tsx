import React from "react";
import { Link } from "react-router-dom";

const Dashboard: React.FC<{
  views_today: string;
  posts_views: string;
  search_appearances: string;
}> = (props) => {
  const { views_today, posts_views, search_appearances } = props;
  return (
    <div className="mt-3 p-5 rounded-md bg-white">
      <div className="flex flex-col justify-center mb-2">
        <div className="flex justify-around text-sm">
          <h1>YOUR DASHBOARD</h1>
          <Link
            to="/profile"
            style={{ color: "#4B47B7" }}
            className="underline decoration-solid"
          >
            GO TO STATS
          </Link>
        </div>
        <hr className="w-full h-0.5 mx-auto my-2 bg-gray-200 border-0 rounded md:my-5 dark:bg-gray-300" />
        <h1 className="text-4xl font-semibold" style={{ color: "#4B47B7" }}>
          {views_today}
        </h1>
        <h1 className="">views today</h1>
        <h2 className="text-4xl font-semibold" style={{ color: "#4B47B7" }}>
          {posts_views}
        </h2>
        <h2 className="">posts views</h2>
        <h3 className="text-4xl font-semibold" style={{ color: "#4B47B7" }}>
          {search_appearances}
        </h3>
        <h3 className="">search appearances</h3>
      </div>
    </div>
  );
};

export default Dashboard;
