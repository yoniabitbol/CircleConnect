import React from "react";
import { NavLink } from "react-router-dom";
import NavLinkModel from "../../../Models/NavLinkModel";
const NavLinks: React.FC<{links: NavLinkModel[]}> = (props) => {
  const {links} = props;
  const navLinkClass = "items-center flex flex-col text-sm font-normal justify-center leading-normal ";
  const navActiveClass = " text-violet-900 dark:text-[#706CC3] border-b-2 border-violet-900 dark:border-[#706CC3] ";
  
  return (
    <nav className="  pt-3 ">
    <ul className="flex list-none items-center">
        {links.map((link : NavLinkModel) => (
            <li key={link.key} className="mr-10 max-md:mr-5">
                <NavLink className={({isActive}) => isActive ? navLinkClass+  navActiveClass : navLinkClass } to={link.path}>{link.icon}
                    <span className="max-md:hidden  mt-2">{link.text}</span>
                </NavLink>
</li>
        ))}
    </ul>
    </nav>
  );
};

export default NavLinks;