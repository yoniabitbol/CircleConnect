import React from "react";
import { Link } from "react-router-dom";

const NavSettings: React.FC = () => {
  return (
    <div className="flex flex-col mb-2 py-5 rounded-md bg-white lg:w-72">
      <Link className="px-6 text-sm" to="/profile">
        NOTIFICATIONS
      </Link>
      <hr className="w-full h-px my-2 bg-gray-200 border-0 rounded md:my-5 dark:bg-gray-300" />
      <Link className="px-6 text-sm" to="/profile">
        NOTIFICATION SETTINGS
      </Link>
    </div>
  );
};

export default NavSettings;
