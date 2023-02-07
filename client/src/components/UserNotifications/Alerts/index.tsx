import React from "react";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";

const Alerts: React.FC<{
  type: string;
  description: string;
  time: string;
}> = (props) => {
  const { description, time } = props;
  const [userProfilePic] = React.useState<string>();
  return (
    <div className="lg:w-2/3 w-4/5 m-5 p-5 rounded-md bg-slate-100 mx-auto">
      <div className="flex-auto">
        <Link to="/profile"><Avatar src={userProfilePic}/></Link>
        <div className="flex flex-col justify-center">
            <h1 className="text-lg font-semibold pt-2">{description}</h1>
            <h2 className="text-sm">{time}</h2>
        </div>
      </div>
    </div>
  );
};

export default Alerts;
