import React from "react";
import ConnectionProfile from "./ConnectionProfile";

const ConnectionRow: React.FC = () => {
  return (
    <div className="lg:flex justify-center lg:text-left py-2">
      <div className="grid grid-cols-6 p-2 text-sm w-7/12 bg-white">
        <div className="col-span-4">
          <ConnectionProfile />
        </div>
        <div className="col-span-1">
          <button
            type="submit"
            className="block mt-4 w-auto px-5 py-3 rounded-lg bg-signup-button
               text-white hover:bg-signup-button-hover shadow-xl shadow-placeholder-purple"
          >
            MESSAGE
          </button>
        </div>
        <div className="col-span-1">...</div>
      </div>
    </div>
  );
};

export default ConnectionRow;
