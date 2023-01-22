import React from "react";
import { Outlet } from "react-router-dom";

const AuthHeader: React.FC = () => {
  return (
    <>
      <nav>
        <img
          className=""
          src="Brand Logo/officccccc.jpg"
          alt="logo"
        />
      </nav>
      <Outlet />
    </>
  );
};

export default AuthHeader;
