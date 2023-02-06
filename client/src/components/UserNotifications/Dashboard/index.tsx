import React from "react";

const Dashboard: React.FC<{
  views_today: string;
  posts_views: string;
  search_appearances: string;
}> = (props) => {
  const { views_today, posts_views, search_appearances } = props;
  return (
    <div className="lg:w-2/3 w-4/5 m-5 p-5 rounded-md bg-slate-100 mx-auto">
      <div className="flex flex-col justify-center mb-2">
            <h1 className="text-4xl font-semibold text-indigo-700">{views_today}</h1>
            <h1 className="">views today</h1>
            <h2 className="text-4xl font-semibold text-indigo-700">{posts_views}</h2>
            <h2 className="">posts views</h2>
            <h3 className="text-4xl font-semibold text-indigo-700">{search_appearances}</h3>
            <h3 className="">search appearances</h3>
          </div>
    </div>
  );
};

export default Dashboard;
