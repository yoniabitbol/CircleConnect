import React from "react";
import ConnectionRow from "../../components/ConnectionRow";

const Network: React.FC = () => {
  return (
    <body style={{ backgroundColor: "#F7F9FB" }}>
      <div className="flex justify-center sm:text-left py-2">
        <div className="grid grid-cols-4 flex items-center gap-4 p-4 sm:text-sm text-xs w-full sm:w-7/12 bg-white">
          <div className="col-span-3 font-bold">357 CONNECTIONS</div>
          <input placeholder="Search" className="border p-2"></input>
        </div>
      </div>
      <ConnectionRow/>
      <ConnectionRow/>
      <ConnectionRow/>
      <ConnectionRow/>
        <ConnectionRow/>
        <ConnectionRow/>
    </body>

  );
};

export default Network;
