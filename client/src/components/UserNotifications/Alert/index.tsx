import React from "react";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";

const Alert: React.FC<{
  type: string;
  description: string;
  time: number;
}> = (props) => {
  const { description, time } = props;
  const [userProfilePic] = React.useState<string>();
  return (
    <div className="lg:w-9/12 w-4/5 m-5 p-5 rounded-md bg-slate-100 mx-auto">
      <div className="flex flex-row justify-between">
        <div className="w-full flex flex-row justify-center">
          <div className="w-1/12"><Link to="/profile"><Avatar src={userProfilePic}/></Link></div>
          <div className="w-full flex flex-col justify-between">
              <h1 className="text-lg font-semibold pt-2">{description}</h1>
              <h2 className="text-sm">{time} hours</h2>
        </div>
        </div>
        <div className="">
          <button className="text-4xl">...</button>
        </div>
      </div>
    </div>
  );
};

export default Alert;
