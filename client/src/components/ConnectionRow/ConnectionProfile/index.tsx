import React from "react";
import placeholder from "./placeholder_profile.png";

const ConnectionProfile: React.FC = () => {
  return (
    <div className="lg:flex lg:text-left py-2">
      <div className="grid grid-cols-2">
        <div className="col-span-1">
          <img src={placeholder} className="w-16 rounded-full"></img>
        </div>
        <div className="col-span-1">
          <p>First Name</p>
          <p>Position</p>
          <p>100 Connections</p>
        </div>
      </div>
    </div>
  );
};

export default ConnectionProfile;
