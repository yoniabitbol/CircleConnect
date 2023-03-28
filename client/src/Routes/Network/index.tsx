import React, {useState, useEffect} from "react";
import ConnectionRow from "../../components/ConnectionRow";
import Usertypes from "../../Models/UserProfileModel";
import getCurrentUserConnections from "../../http/getCurrentUserConnections";
import getUserProfilePic from "../../http/getUserPicturePic";

type ConnectionType = Omit<Usertypes, "location" | "email" | "phone" | "website" | "backdrop" | "summary" |
  "projects" | "skills" | "experience" | "education" | "languages" | "awards" | "courses" | "applications" | "posts">;

  const Network: React.FC = () => {
const [connections, setConnections] = useState<any>([]);
const [search, setSearch] = useState<string>("");
const [filteredConnections, setFilteredConnections] = useState<any>([]);
const [userProfilePic, setUserProfilePic] = useState<string[]>();


  useEffect(() => {
    getCurrentUserConnections().then((res) => {
      setConnections(res.data.connections);
    });
    getCurrentUserConnections().then((res) => {
      setFilteredConnections(res.data.connections);
    });
  }, []);


  useEffect(() => {
    async function fetchUserProfile() {
      const profilePicUrls = await Promise.all(connections.map(async (user: ConnectionType) => {
        const profilePicUrl = await getUserProfilePic(user.picture)


        return profilePicUrl;
      }));      
      setUserProfilePic(profilePicUrls);
    }
    fetchUserProfile();
  }, [connections]);


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
            user_id={connection.user_id}
            name={connection.name}
            title={connection.title}
            connections={connection.connections}
            picture={userProfilePic ? userProfilePic[index] : ""}
          />
        );
      })
      }
    </body>

  );
};

export type { ConnectionType };
export default Network;