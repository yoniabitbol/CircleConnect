import React from "react";
import { Link } from "react-router-dom";

const NavSettings: React.FC = () => {
  return (
    <div className="flex flex-col justify-center mb-2 text-sm p-5 rounded-md bg-white">
      <Link to="/profile">NOTIFICATIONS</Link>
      <hr className="w-full h-px mx-auto my-2 bg-gray-200 border-0 rounded md:my-5 dark:bg-gray-300" />
      <Link to="/profile">NOTIFICATION SETTINGS</Link>
    </div>
  );
};

export default NavSettings;
