import React from "react";
import placeholder from "./placeholder_profile.png";

const ConnectionRow: React.FC = () => {
  return (
    <div className="flex justify-center lg:text-left md:text-left text-center py-2">
      <div className="grid lg:grid-cols-6 md:grid-cols-5 sm:grid-cols-1 p-4 lg:text-sm md:text-xs sm:text-xs lg:w-7/12 bg-white">
        <div className="lg:col-span-1 md:col-span-1">
          <img
            src={placeholder}
            className="w-16 rounded-full md:align-center"
          ></img>
        </div>
        <div className="lg:col-span-1 md:col-span-1 py-2">
          <p>First Name</p>
          <p>Position</p>
          <p>100 Connections</p>
        </div>
        <div className="lg:col-span-2 md:col-span-1"></div>
        <div className="lg:col-span-1 md:col-span-1">
          <button
            type="submit"
            className="block lg:mt-4 w-auto px-5 py-2 rounded-md bg-signup-button
               text-white hover:bg-signup-button-hover"
          >
            MESSAGE
          </button>
        </div>
        <div className="lg:col-span-1 md:col-span-1">
          <button type="submit">•••</button>
        </div>
      </div>
    </div>
  );
};

export default ConnectionRow;
