import React from "react";
import { NavLink } from "react-router-dom";
import {RssFeed, PeopleAltOutlined,WorkOutlineOutlined, ChatBubbleOutlineOutlined, NotificationsNoneOutlined} from "@mui/icons-material";

const NavLinks: React.FC = () => {
  const iconsize="medium"
  const navLinks = [
    {
      key: 1,
      icon: <RssFeed fontSize={iconsize}/>,
        text: "Feed",
        path: "/feed",
    },
    {
        key: 2,
        icon: <PeopleAltOutlined fontSize={iconsize}/>,
        text: "Network",
        path: "/network",
    },
    {
        key: 3,
        icon: <WorkOutlineOutlined fontSize={iconsize}/>,
        text: "Jobs",
        path: "/jobs",
    },
    {
        key: 4,
        icon: <ChatBubbleOutlineOutlined fontSize={iconsize}/>,
        text: "Chat",
        path: "/jobs",
    },
    {
        key: 5,
        icon: <NotificationsNoneOutlined fontSize={iconsize}/>,
        text: "Notices",
        path: "/notices",
      
    },]
  const navLinkClass = "items-center flex flex-col text-sm font-normal justify-center ";
  const navActiveClass = " text-violet-900 border-b-2 border-violet-900";
  return (
    <nav className="ml-2  pr-6 w-full h-full">
    <ul className="flex list-none items-center space-x-3">
        {navLinks.map((link) => (
            <li key={link.key} className="mb-5 max-md:mr-5">
                <NavLink className={({isActive}) => isActive ? navLinkClass+  navActiveClass : navLinkClass } to={link.path}> {link.icon}
                    <span className="max-md:hidden mt-2">{link.text}</span>
                </NavLink>
</li>
        ))}
    </ul>
    </nav>
  );
};

export default NavLinks;