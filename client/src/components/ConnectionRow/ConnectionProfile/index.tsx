import React from "react";
import placeholder from "./placeholder_profile.png";

const ConnectionProfile: React.FC = () => {
  return (
    <div className="lg:flex lg:text-left lg:py-2 lg:px-5">
      <div className="grid grid-cols-2">
        <div className="col-span-1">
          <img
            src={placeholder}
            className="lg:w-16 md:w-9 sm:w-9 rounded-full"
          ></img>
        </div>
        <div className="col-span-1">
          <p>
            <b>First Last</b>
          </p>
          <p>Position</p>
          <p style={{ color: "#4D47C3" }}>100 Connections</p>
          {/* No. of connections passed as props */}
        </div>
      </div>
    </div>
  );
};

export default ConnectionProfile;
