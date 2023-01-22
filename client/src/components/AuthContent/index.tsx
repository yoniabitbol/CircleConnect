import React from "react";
import { Link, useLocation } from "react-router-dom";
import classes from './style.module.css'
const AuthContent : React.FC = () => {
  const location = useLocation()
  return (
    <div className={classes.content}>
      <div className="w-1/2">
        <div className="h-full flex">
          <div className="block w-1/2 mx-auto self-center">
            <h1 className="text-4xl font-bold">CircleConnect</h1>
            <h2 className="text-2xl font-medium mt-3">
              Connect, Collaborate, and Grow Your Circle
            </h2>
            {location.pathname === '/signup' ? (<div className="font-medium mt-3">
              If you already have an account <br /> You can{" "}
              <Link to='/login' className="text-blue-500">Login here</Link>
            </div>) : (<div className="font-medium mt-3">
              If you don&apos;t already have an account <br /> You can{" "}
              <Link to='/signup' className="text-blue-500">Sign-up here</Link>
            </div>)}
          </div>
         
        </div>
      </div>
      <div className={classes.maskot}>
        <img src='Maskot/img.png'/>
      </div>
    </div>
   
  );
};

export default AuthContent;