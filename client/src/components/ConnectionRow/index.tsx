import React from "react";
import ConnectionProfile from "./ConnectionProfile";

const ConnectionRow: React.FC = () => {
  return (
    <div className="lg:flex justify-center lg:text-left py-2">
      <div className="grid grid-cols-6 sm:grid-cols-2 lg:p-2 lg:text-sm lg:w-7/12 bg-white">
        <div className="col-span-4">
          <ConnectionProfile />
        </div>
        <div className="col-span-1">
          <button
            type="submit"
            className="block mt-4 w-auto px-5 py-2 rounded-md bg-signup-button
               text-white hover:bg-signup-button-hover"
          >
            MESSAGE
          </button>
        </div>
        <div className="col-span-1">
          <button type="submit">•••</button>
        </div>
      </div>
    </div>
  );
};

export default ConnectionRow;
