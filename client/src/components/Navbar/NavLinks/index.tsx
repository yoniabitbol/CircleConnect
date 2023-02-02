import React from "react";
import { NavLink } from "react-router-dom";
import {RssFeed, PeopleAltOutlined,WorkOutlineOutlined, ChatBubbleOutlineOutlined, NotificationsNoneOutlined} from "@mui/icons-material";

const NavLinks: React.FC = () => {
  const navLinks = [
    {
      key: 1,
      icon: <RssFeed />,
        text: "Feed",
        path: "/",
    },
    {
        key: 2,
        icon: <PeopleAltOutlined />,
        text: "Network",
        path: "/network",
    },
    {
        key: 3,
        icon: <WorkOutlineOutlined />,
        text: "Jobs",
        path: "/jobs",
    },
    {
        key: 4,
        icon: <ChatBubbleOutlineOutlined />,
        text: "Chat",
        path: "/jobs",
    },
    {
        key: 5,
        icon: <NotificationsNoneOutlined />,
        text: "Notices",
        path: "/notices",
      
    },]
  const navLinkClass = "items-center flex flex-col text-sm font-normal justify-center leading-normal ";
  const navActiveClass = " text-violet-900 border-b-2 border-violet-900";
  return (
    <nav className="ml-2  pt-3">
    <ul className="flex list-none items-center">
        {navLinks.map((link) => (
            <li key={link.key} className="mr-10 max-md:mr-5">
                <NavLink className={({isActive}) => isActive ? navLinkClass+  navActiveClass : navLinkClass } to={link.path}> {link.icon}
                    <span className="max-md:hidden  mt-2">{link.text}</span>
                </NavLink>
</li>
        ))}
    </ul>
    </nav>
  );
};

export default NavLinks;