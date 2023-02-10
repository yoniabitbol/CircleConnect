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
    <div className="lg:w-11/12 w-4/5 m-5 p-5 rounded-md bg-slate-100 mx-auto">
      <div className="flex flex-row justify-between">
        <div><Link to="/profile"><Avatar src={userProfilePic}/></Link></div>
        <div className="flex flex-row justify-between">
            <div className="flex flex-col">
                <h1 className="text-xl font-semibold pt-2">{name}</h1>
                <h2 className="text-sm">{job_title}</h2>
                <h3 className="text-sm" style={{color: '#4B47B7'}}>{connections} connections</h3>
            </div>
            <div className="flex flex-row w-1/3">
                <h1 className="text-6xl" style={{color: '#4B47B7'}}>|</h1>
                <h3 className="text-sm text-gray-400">{connection_message}</h3>
            </div>
            <div className="flex flex-row">
                <button>ACCEPT</button>
                <button>DECLINE</button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectionInvite;
