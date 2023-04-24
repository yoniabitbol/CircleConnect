import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import NavLinkModel from "../../../Models/NavLinkModel";
import { notificationType } from "../../../Models/UserProfileModel";
import getUnreadNotification from "../../../http/getUnreadNotifications";
import { Badge } from "@mui/material";
const NavLinks: React.FC<{links: NavLinkModel[]}> = (props) => {
  const {links} = props;
  const navLinkClass = "items-center flex flex-col text-sm font-normal justify-center leading-normal ";
  const navActiveClass = " text-violet-900 dark:text-[#706CC3] border-b-2 border-violet-900 dark:border-[#706CC3] ";
  
  const [unreadNotifications, setUnreadNotifications] =
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
  }, []);


  return (
    <nav className="  pt-3 ">
    <ul className="flex list-none items-center">
        {links.map((link : NavLinkModel) => (
            <li key={link.key} className="mr-10 max-md:mr-5">
              {link.key == 5? (
                <Badge badgeContent={unreadNotifications?.length} color="secondary" overlap="circular">
                    <NavLink className={({isActive}) => isActive ? navLinkClass+  navActiveClass : navLinkClass } to={link.path}>{link.icon}
                      <span className="max-md:hidden  mt-2">{link.text}</span>
                    </NavLink>
                </Badge>
            ) : (
              <NavLink className={({isActive}) => isActive ? navLinkClass+  navActiveClass : navLinkClass } to={link.path}>{link.icon}
                <span className="max-md:hidden  mt-2">{link.text}</span>
              </NavLink>
            )}
            </li>
        ))}
    </ul>
    </nav>
  );
};

export default NavLinks;