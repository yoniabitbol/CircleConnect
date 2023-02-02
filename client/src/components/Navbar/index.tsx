import React from "react";
import NavLinks from "./NavLinks";
// import styled from "styled-components";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar";
import { Avatar, Button } from "@mui/material";
// import RssFeedIcon from '@mui/icons-material/RssFeed';
// import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
// import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
// import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
// import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
// import SearchIcon from '@mui/icons-material/Search';

const NavBar: React.FC = () => {
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
      <div className=" flex  items-center justify-start p-2.5 space-x-3.5">
        <div className="">
          <SearchBar/>
        </div>
      </div>
      <div className="flex space-x-7 max-md:hidden">
        <Avatar />
        <Button variant="outlined">Logout</Button>
      </div>
    </div>
    )};

export default NavBar;