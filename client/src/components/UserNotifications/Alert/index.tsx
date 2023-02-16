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
    <div className="w-full lg:w-10/12 m-4 p-3 rounded-md bg-white mx-auto h-20">
      <div className="flex flex-row justify-between">
        <div className="w-full flex flex-row justify-center">
          <div className="lg:w-1/12 pt-2 pl-1">
            <Link to="/profile">
              <Avatar src={userProfilePic} />
            </Link>
          </div>
          <div className="w-full flex flex-col justify-between pl-4">
            <h1 className="text-md font-semibold pt-2">{description}</h1>
            <h2 className="text-xs">{time} hours</h2>
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
