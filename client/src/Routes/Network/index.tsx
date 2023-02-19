import React, {useState, useEffect} from "react";
import ConnectionRow from "../../components/ConnectionRow";
import getUserConnections from "../../http/getUserConnections";
import { Usertypes } from "../../components/UserProfile";

type ConnectionType = Omit<Usertypes, "location" | "email" | "phone" | "website" | "backdrop" | "summary" |
  "projects" | "skills" | "experience" | "education" | "languages" | "awards" | "courses">;

  const Network: React.FC = () => {
const [connections, setConnections] = useState<any>([]);
const [search, setSearch] = useState<string>("");
const [filteredConnections, setFilteredConnections] = useState<any>([]);

  useEffect(() => {
    getUserConnections().then((res) => {
      setConnections(res.data.connections);
      setFilteredConnections(connections)
    });
  }, []);
  
  const onInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    if(e.target.value === ""){
        setFilteredConnections(connections);
    }else{
      const filteredConnections = connections.filter((connection: ConnectionType) => {
        return connection.name.toLowerCase().includes(e.target.value.toLowerCase());
      });
      setFilteredConnections(filteredConnections);
    }
    
    }
    
  return (
    <body style={{ backgroundColor: "#F7F9FB" }}>
      <div className="flex justify-center sm:text-left py-2">
        <div className="grid grid-cols-4 flex items-center gap-4 p-4 sm:text-sm text-xs w-full sm:w-7/12 bg-white">
          <div className="col-span-3 font-bold">{connections.length} CONNECTIONS</div>
          <input placeholder="Search" onChange={onInputChangeHandler} value={search} className="border p-2"></input>
        </div>
      </div>
      {filteredConnections.map((connection: ConnectionType, index: number) => {
        return (
          <ConnectionRow
            key={index}
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