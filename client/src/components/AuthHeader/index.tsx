import React from "react";
import {Outlet} from "react-router-dom";
import classes from './index.module.css';
const AuthHeader:React.FC = () => {
  return (
    <>
    <nav>
      <img className={classes.headerlogo} src="Brand Logo/officccccc.jpg" alt="logo" />
    </nav>
      <Outlet/>
    </>
  );
};

export default AuthHeader;