import React from "react";
import { Link } from "react-router-dom";

const NavSettings: React.FC = () => {
  return (
    <div className="lg:w-2/3 w-4/5 m-5 p-5 rounded-md bg-slate-100 mx-auto">
        <div className="flex flex-col justify-center mb-2">
            <Link to="/profile">NOTIFICATIONS</Link>
            <hr className="w-60 h-0.5 mx-auto my-2 bg-gray-100 border-0 rounded md:my-5 dark:bg-gray-300"/>
            <Link to="/profile">NOTIFICATION SETTINGS</Link>
        </div>
  </div>
  );
};

export default NavSettings;