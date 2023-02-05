import React from "react";

const ConnectionProfile: React.FC = () => {
  return (
    <div className="lg:flex lg:text-left py-2">
      <div className="grid grid-cols-2">
        <div className="col-span-1">
          <img src="..."></img>
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
