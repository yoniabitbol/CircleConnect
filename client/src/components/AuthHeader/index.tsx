import React from "react";
import { Outlet, Link } from "react-router-dom";

const AuthHeader: React.FC = () => {
  return (
    <>
      <nav className="h-32 dark:background-dark">
        <Link to="/">
          <img className="h-20" src="Brand Logo/officccccc.png" alt="logo" />
        </Link>
      </nav>
      <Outlet />
    </>
  );
};

export default AuthHeader;
