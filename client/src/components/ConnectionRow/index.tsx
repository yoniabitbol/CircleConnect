import React from "react";
import placeholder from "./placeholder_profile.png";

const ConnectionRow: React.FC = () => {
  return (
    <div className="flex justify-center sm:text-left text-center py-2">
      <div className="flex items-center gap-4 p-4 sm:text-sm text-xs w-full sm:w-7/12 bg-white">
        <div className="">
          <img
            src={placeholder}
            className="w-16 rounded-full md:align-center"
          ></img>
        </div>
        <div className="grow py-2">
          <p>First Name</p>
          <p>Position</p>
          <p>100 Connections</p>
        </div>
        <div className="">
          <button
            type="submit"
            className="block lg:mt-4 w-auto px-5 py-2 rounded-md bg-signup-button
               text-white hover:bg-signup-button-hover"
          >
            MESSAGE
          </button>
        </div>
        <div className="">
          <button type="submit">
            <b>•••</b>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConnectionRow;
