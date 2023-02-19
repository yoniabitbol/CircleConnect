import React from "react";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";

const ConnectionInvite: React.FC<{
  name: string;
  job_title: string;
  connections: number;
  connection_message: string;
}> = (props) => {
  const { name, job_title, connections, connection_message } = props;
  const [userProfilePic] = React.useState<string>();
  return (
    <div className="w-full lg:w-10/12 m-4 p-3 rounded-md bg-white mx-auto h-auto">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row space-x-8">
          <div className="w-1/12 pt-2 pl-1">
            <Link to="/profile">
              <Avatar src={userProfilePic} />
            </Link>
          </div>
          <div className="flex flex-col lg:pl-5 pl-3">
            <h1 className="text-md font-bold pt-2">{name}</h1>
            <h2 className="text-xs font-semibold">{job_title}</h2>
            <h3 className="text-xs" style={{ color: "#4B47B7" }}>
              {connections} connections
            </h3>
          </div>
        </div>
        <div className="hidden md:flex flex-row w-1/3">
          <h1 className="text-4xl pr-2" style={{ color: "#4B47B7" }}>
            |
          </h1>
          <h3 className="text-sm text-gray-400">{connection_message}</h3>
        </div>
        <div className="flex flex-row space-x-1 lg:space-x-4 mt-4">
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm w-24 h-8"
          >
            ACCEPT
          </button>
          <button
            type="submit"
            className="bg-slate-400 hover:bg-slate-500 text-white rounded-md text-sm w-24 h-8"
          >
            DECLINE
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConnectionInvite;
