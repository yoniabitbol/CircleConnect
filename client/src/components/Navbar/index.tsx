/* eslint-disable react/no-unknown-property */
/* eslint-disable max-len */
import React from "react";
import { Outlet } from "react-router-dom";
import RssFeedIcon from '@mui/icons-material/RssFeed';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';

const NavBar: React.FC = () => {
  return (
    <>
      {/* <nav classNameName="h-32">
        <div classNameName="container flex flex-wrap items-center  mx-auto">
            <Link to='/'>
          <img
            classNameName="h-20"
            src="Brand Logo/officccccc.jpg"
            alt="logo"
          />
        </Link>
        <Link to='/feed'>
        <RssFeedIcon classNameName="h-20" />
        </Link>
        <Link to='/network'>
        <PeopleAltOutlinedIcon classNameName="h-20" />
        </Link>
        <Link to='/jobs'>
        <WorkOutlineOutlinedIcon classNameName="h-20" />
        </Link>
        <Link to='/chat'>
        <ChatBubbleOutlineOutlinedIcon classNameName="h-20" />
        </Link>
        <Link to='/notifications'>
        <NotificationsNoneOutlinedIcon classNameName="h-20" />
        </Link>
        </div>
       
      </nav> */}

<nav className="bg-white px-2 sm:px-4 py-2.5 light:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 light:border-gray-600">
  <div className="container flex flex-wrap items-center justify-between mx-auto">
  <a href="" className="flex items-center">
      <img src="Brand Logo/officccccc.jpg" className="h-20" alt="Logo" />
      <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
  </a>
  <div className="flex md:order-2">
      <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
    </button>
  </div>
  <div className="hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
    <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white">
      <li>
      <RssFeedIcon className="h-20" />
        <a href="/feed" className="block py-2 pl-3 pr-4 text-black bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white">Feed</a>
      </li>
      <li>
        <PeopleAltOutlinedIcon className="h-20" />
        <a href="/network" className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Network</a>
      </li>
      <li>
        <WorkOutlineOutlinedIcon className="h-20" />
        <a href="/jobs" className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Jobs</a>
      </li>
      <li>
        <ChatBubbleOutlineOutlinedIcon className="h-20" />
        <a href="chat" className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Chat</a>
      </li>
      <li>
        <NotificationsNoneOutlinedIcon className="h-20" />
        <a href="notifications" className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Notifications</a>
      </li>
    </ul>
  </div>
  </div>
</nav>

      <Outlet />
    </>
  );
};

export default NavBar;