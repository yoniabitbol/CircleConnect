import React, {useState} from "react";
import { Link } from "react-router-dom";

const NavSettings: React.FC = () => {
  const [isClicked, setIsClicked] = useState('notif');

  function handleClick(tabName: string) {
    setIsClicked(tabName);
  }

  return (
    <div className="flex flex-col mb-2 py-5 rounded-md bg-white lg:w-72">
      <Link className={`px-6 text-sm 
      ${isClicked === 'notif' ? 'text-gray-400 ' : ''}`} 
        to="/notifications" onClick={() => handleClick('notif')}>
        NOTIFICATIONS
      </Link>
      <hr className="w-full h-px my-2 bg-gray-200 border-0 rounded md:my-5 dark:bg-gray-300" />
      <Link className={`px-6 text-sm ${isClicked === 'setting' ? 'text-gray-400' : ''}`} 
        to="/notifications" onClick={() => handleClick('setting')}>
        NOTIFICATION SETTINGS
      </Link>
    </div>
  );
};

export default NavSettings;