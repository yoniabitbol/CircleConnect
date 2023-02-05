import React from "react";
import ConnectionRow from "../../components/ConnectionRow";

const Network: React.FC = () => {
  return (
    <body style={{ backgroundColor: "#EEF1FF" }}>
      <div className="lg:flex justify-center lg:text-left py-8">
        <div className="grid grid-cols-3 p-8 w-3/5 gap-1 text-lg bg-white">
          <div className="col-span-2 font-bold">357 CONNECTIONS</div>
          <div className="opacity-40">
            <input placeholder="🔍Search"></input>
          </div>
        </div>
      </div>
      <ConnectionRow />
      <ConnectionRow />
      <ConnectionRow />
    </body>
  );
};

export default Network;
