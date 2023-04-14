import React, {useState} from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const NavSettings: React.FC = () => {
  const {t} = useTranslation();
  const [isClicked, setIsClicked] = useState('notif');

  function handleClick(tabName: string) {
    setIsClicked(tabName);
  }

  return (
    <div className="flex flex-col mb-2 py-5 rounded-md bg-white lg:w-72">
      <Link data-testid="link-click-0" className={`px-6 text-sm 
      ${isClicked === 'notif' ? 'text-gray-400 ' : ''}`} 
        to="/notifications" onClick={() => handleClick('notif')}>
        {t('notifications.label.notifications')}
      </Link>
      <hr className="w-full h-px my-2 bg-gray-200 border-0 rounded md:my-5 dark:bg-gray-300" />
      <Link data-testid="link-click-1" className={`px-6 text-sm ${isClicked === 'setting' ? 'text-gray-400' : ''}`}
        to="/notifications" onClick={() => handleClick('setting')}>
        {t('notifications.label.notifSettings')}
      </Link>
    </div>
  );
};

export default NavSettings;