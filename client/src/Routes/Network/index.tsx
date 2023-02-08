import React from "react";
import ConnectionRow from "../../components/ConnectionRow";

const Network: React.FC = () => {
  return (
    <body style={{ backgroundColor: "#F7F9FB" }}>
      <div className="flex justify-center text-left py-8">
        <div className="grid grid-cols-3 p-4 lg:w-7/12 gap-2 lg:text-base text-xs bg-white">
          <div className="col-span-2 font-bold">357 CONNECTIONS</div>
          <input placeholder="Search" style={{ outline: "none" }}></input>
        </div>
      </div>
      <ConnectionRow />
      <ConnectionRow />
      <ConnectionRow />
      <ConnectionRow />
      <ConnectionRow />
      <ConnectionRow />
    </body>
  );
};

export default Network;
