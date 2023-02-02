import React from "react";
import NavLinks from "./NavLinks";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar";
import { Avatar, Button } from "@mui/material";
import useLogout from "../../hooks/useLogout";

const NavBar: React.FC = () => {
  const {logout} = useLogout();
  return (
    <div className="max-w-full p-2 flex items-center">
      <div className="flex w-1/2 h-max  max-md:w-4/5 ">
        <Link className="ml-5 w-2/5" to='/'>
          <img
            className="w-20"
            src="Brand Logo/officccccc.png"
            alt="logo"
          />
        </Link>
        <NavLinks />
      </div>
      <div className="flex justify-end items-center w-1/2">
        <div className="flex items-center p-2.5">
          <div className="max-md:hidden">
            <SearchBar/>
          </div>
        </div>
        <div className="flex space-x-7">
          <Avatar />
          <Button onClick={logout} variant="outlined">Logout</Button>
        </div>
      </div>
      
    </div>
    )};

export default NavBar;