/* eslint-disable react/jsx-key */
import React, {useState, useEffect} from "react";
import ConnectionRow from "../../components/ConnectionRow";
import getUserConnections from "../../http/getUserConnections";
import { Usertypes } from "../../components/UserProfile";

type ConnectionType = Omit<Usertypes, "location" | "email" | "phone" | "website" | "backdrop" | "summary" |
  "projects" | "skills" | "experience" | "education" | "languages" | "awards" | "courses">;

  const Network: React.FC = () => {
const [connections, setConnections] = useState<any>([]);

  useEffect(() => {
    getUserConnections().then((res) => {
      setConnections(res.data.connections);
    });
  }, []);



  return (
    <body style={{ backgroundColor: "#F7F9FB" }}>
      <div className="flex justify-center sm:text-left py-2">
        <div className="grid grid-cols-4 flex items-center gap-4 p-4 sm:text-sm text-xs w-full sm:w-7/12 bg-white">
          <div className="col-span-3 font-bold">{connections.length} CONNECTIONS</div>
          <input placeholder="Search" className="border p-2"></input>
        </div>
      </div>
      {connections.map((connection: ConnectionType) => {
        return (
          <ConnectionRow
            name={connection.name}
            title={connection.title}
            connections={connection.connections}
            picture={connection.picture}
          />
        );
      })
      }
    </body>

  );
};

export type { ConnectionType };
export default Network;