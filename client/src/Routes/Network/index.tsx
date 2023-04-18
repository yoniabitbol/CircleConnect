import React, { useState, useEffect } from "react";
import ConnectionRow from "../../components/ConnectionRow";
import Usertypes from "../../Models/UserProfileModel";
import getCurrentUserConnections from "../../http/getCurrentUserConnections";
import { useTranslation } from "react-i18next";
type ConnectionType = Omit<
  Usertypes,
  | "location"
  | "email"
  | "phone"
  | "website"
  | "backdrop"
  | "summary"
  | "projects"
  | "skills"
  | "experience"
  | "education"
  | "languages"
  | "awards"
  | "courses"
  | "applications"
  | "posts"
  | "preferenceTags"
>;

const Network: React.FC = () => {
  const { t } = useTranslation();
  const [connections, setConnections] = useState<any>([]);
  const [search, setSearch] = useState<string>("");
  const [filteredConnections, setFilteredConnections] = useState<any>([]);

  useEffect(() => {
    getCurrentUserConnections().then((res) => {
      setConnections(res.data.connections);
    });
    getCurrentUserConnections().then((res) => {
      setFilteredConnections(res.data.connections);
    });
  }, []);

  const onInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    if (e.target.value === "") {
      setFilteredConnections(connections);
    } else {
      const filteredConnections = connections.filter(
        (connection: ConnectionType) => {
          return connection.name
            .toLowerCase()
            .includes(e.target.value.toLowerCase());
        }
      );
      setFilteredConnections(filteredConnections);
    }
  };

  return (
    <body style={{ backgroundColor: "#F7F9FB" }}>
      <div className="flex justify-center sm:text-left py-2">
        <div className="grid grid-cols-4 flex items-center gap-4 p-4 sm:text-sm text-xs w-full sm:w-7/12 bg-white">
          <div className="col-span-3 font-bold">
            {connections.length} {t("common.label.connections")}
          </div>
          <input
            placeholder={t("common.label.search") as string}
            onChange={onInputChangeHandler}
            value={search}
            className="border p-2"
          ></input>
        </div>
      </div>
      {filteredConnections.map((connection: ConnectionType) => {
        return (
          <ConnectionRow
            key={connection.user_id}
            user_id={connection.user_id}
            name={connection.name}
            title={connection.title === "undefined" ? "" : connection.title}
            connections={connection.connections}
            picture={connection.picture && connection.picture}
          />
        );
      })}
    </body>
  );
};

export type { ConnectionType };
export default Network;
