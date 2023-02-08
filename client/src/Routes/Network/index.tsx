import React from "react";
import ConnectionRow from "../../components/ConnectionRow";

const Network: React.FC = () => {
  return (
    <body style={{ backgroundColor: "#EEF1FF" }}>
      <div className="lg:flex justify-center lg:text-left py-8">
        <div className="grid grid-cols-3 p-4 w-7/12 gap-2 text-base bg-white">
          <div className="col-span-2 font-bold">357 CONNECTIONS</div>
          <input placeholder="Search" style={{ outline: "none" }}></input>
        </div>
      </div>
      {/* No. of connections passed as prop */}
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
