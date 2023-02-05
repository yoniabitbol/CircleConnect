import React from "react";

const Network: React.FC = () => {
  return (
    <body>
      <div className="lg:flex justify-center lg:text-left">
        <div className="grid grid-cols-3 p-8 w-3/5 gap-1 text-lg">
          <div className="col-span-2 font-bold">357 CONNECTIONS</div>
          <div className="opacity-40">Search</div>
        </div>
      </div>
    </body>
  );
};

export default Network;
