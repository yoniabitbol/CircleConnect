import React, { useState, useEffect } from "react";
import { Avatar } from "@mui/material";
import getUserProfile from "../../../http/getUserProfile";
import { Usertypes } from "../../UserProfile";
import getUserProfilePic from "../../../http/getUserPicturePic";
// import acceptConnectionRequest from "../../../http/acceptConnectionRequest";
import declineConnectionRequest from "../../../http/declineConnectionRequest";
import markSingleNoficationsRead from "../../../http/markSingleNotificationRead";

const ConnectionInvite: React.FC<{
  initiatorID: string;
  notificationID: string;
  notificationIsRead: boolean;
}> = (props) => {
  const { initiatorID, notificationID, notificationIsRead } = props;

  console.log(notificationID);

  const [user, setUser] = useState<Usertypes>();
  const [picture, setPicture] = useState<any>();
  const [connectionState, setConnectionState] = useState("unset");

  useEffect(() => {
    async function fetchUser(user_id: string) {
      try {
        if (user_id === null) return;
        const user = await getUserProfile(user_id);
        setUser(user.data.user); // get post from the response object
      } catch (error) {
        console.log(error);
      }
    }
    fetchUser(initiatorID);
  }, []);

  useEffect(() => {
    async function fetchUserProfilePic() {
      try {
        if (user?.picture == null) return;
        const profilePicUrl = await getUserProfilePic(user?.picture);
        setPicture(profilePicUrl);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUserProfilePic();
  }, []);

  return (
    <div>
      {user == null ? null : (
        <div className="w-full m-4 py-3 rounded-md bg-white h-auto dark:secondary-dark">
          <div className="flex flex-row justify-between px-3">
            <div className="flex flex-row space-x-8 ">
              <div className="pt-2">
                <Avatar sx={{ width: 50, height: 50 }} src={picture} />
              </div>
              <div className="flex flex-col">
                <h1 className="text-md font-bold">{user?.name}</h1>
                <h2 className="text-xs font-semibold">{user?.title}</h2>
                <h3 className="text-xs text-[#4B47B7] dark:main-color">
                  {user?.connections.length} connections
                </h3>
              </div>
            </div>
            <div className="hidden md:flex flex-row w-1/3">
              <h1 className="text-4xl pr-2" style={{ color: "#4B47B7" }}>
                |
              </h1>
              <h3 className="text-sm text-gray-400">
                {"Hey! Let's connect..."}
              </h3>
            </div>
            <div className="flex flex-row space-x-1 lg:space-x-4 mt-4">
              {connectionState == "unset" ? (
                <div className="flex flex-row space-x-1 lg:space-x-4 mt-4">
                  <button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm w-24 h-8"
                    onClick={() => {
                      // acceptConnectionRequest(initiatorID);
                      // setConnectionState("connected");
                      markSingleNoficationsRead(notificationID);
                      console.log(notificationIsRead);
                    }}
                  >
                    ACCEPT
                  </button>
                  <button
                    type="submit"
                    className="bg-slate-400 hover:bg-slate-500 text-white rounded-md text-sm w-24 h-8"
                    onClick={() => {
                      declineConnectionRequest(initiatorID);

                      setConnectionState("notConnected");
                    }}
                  >
                    DECLINE
                  </button>
                </div>
              ) : null}
              {connectionState === "connected" ? (
                <div className="text-xs text-b">
                  {user?.name + " is now a connection."}
                </div>
              ) : null}
              {connectionState === "notConnected" ? (
                <div className="text-xs text-b">
                  {"Connection request declined."}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConnectionInvite;
