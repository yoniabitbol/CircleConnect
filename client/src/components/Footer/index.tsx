/* eslint-disable react/no-unknown-property */
/* eslint-disable max-len */
import React from "react";
import LanguageDropdown from "./LanguageDropdown";

const Footer: React.FC = () => {
  return (
    <footer className="p-4 bg-white border light:bg-gray-900 bottom-0 right-0 left-0">
        <div className="sm:flex sm:items-center sm:justify-between">
            <a href="profile" className="flex items-center mb-4 sm:mb-0">
            <img
            className="h-8 mr-3"
            src="Brand Logo/officccccc.png"
            alt="logo"
          />
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-black">CircleConnect</span>
            </a>
        <LanguageDropdown/>
        </div>
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="#" className="hover:underline">CircleConnect</a>. All Rights Reserved.
        </span>
    </footer>
    )
};

export default Footer;
