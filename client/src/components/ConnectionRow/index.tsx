import React from "react";
import { ConnectionType } from "../../Routes/Network";

const ConnectionRow: React.FC<ConnectionType> = (props:ConnectionType) => {
  return (
    <div className="flex justify-center sm:text-left text-center py-2">
      <div className="flex items-center gap-4 p-4 sm:text-sm text-xs w-full sm:w-7/12 bg-white">
        <div className="">
          <img
            src={props.picture}
            className="w-16 rounded-full md:align-center"
          ></img>
        </div>
        <div className="grow py-2">
          <p>{props.name}</p>
          <p>{props.title}</p>
          <p>{props.connections.length} Connections</p>
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