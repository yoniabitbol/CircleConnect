import React from "react";
import { Outlet } from "react-router-dom";

const AuthHeader: React.FC = () => {
  return (
    <>
      <nav className="h-32">
        <img
          className="h-20"
          src="Brand Logo/officccccc.jpg"
          alt="logo"
        />

      </nav>
      <Outlet />
    </>
  );
};

export default AuthHeader;
