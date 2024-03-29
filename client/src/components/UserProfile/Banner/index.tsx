import React, { useState, useEffect } from "react";
import getUserBackdrop from "../../../http/getUserBackdrop";
import getUserProfilePic from "../../../http/getUserPicturePic";
import { auth } from "../../../firebase/config";

import getOutgoingConnectionRequests from "../../../http/getOutgoingConnectionRequests";
import getIncomingConnectionRequests from "../../../http/getIncomingConnectionRequests";
import getUserConnections from "../../../http/getUserConnections";
import acceptConnectionRequest from "../../../http/acceptConnectionRequest";
import declineConnectionRequest from "../../../http/declineConnectionRequest";
import removeConnection from "../../../http/removeConnection";
import cancelConnectionRequest from "../../../http/cancelConnectionRequest";

import { useParams } from "react-router-dom";

import sendConnectionRequest from "../../../http/sendConnectionRequest";
import sendNotification from "../../../http/sendNotification";
import {Button} from '@mui/material';

const Banner: React.FC<{
  banner: {
    name: string;
    title: string;
    location: string;
    email: string;
    phone: string;
    website: string;
    connections: string[];
    picture: string;
    backdrop: string;
  };
}> = ({ banner }) => {
  const user = auth.currentUser;
  const user_id = user && user.uid;

  const [backdropUrl, setBackdropUrl] = useState("");
  const [profilePicUrl, setProfilePicUrl] = useState("");

  const [connectionState, setConnectionState] = useState("");
  const [connectedButtonMessage, setConnectedButtonMessage] =
    useState("Connected");
  const [cancelConnection, setCancelConnection] = useState("Sent Request");

  const params = useParams<{ id?: string }>();
  const profileId = params.id;

  // Fetch user profile picture and backdrop
  useEffect(() => {
    async function fetchUserProfile() {
      try {
        // if (banner.backdrop === "" || banner.picture === "") return;
        const backdropUrl = await getUserBackdrop(banner.backdrop);
        const profilePicUrl = await getUserProfilePic(banner.picture);

        setBackdropUrl(backdropUrl);
        setProfilePicUrl(profilePicUrl);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUserProfile();
  }, [banner.backdrop, banner.picture]);

  // Fetch connection state
  useEffect(() => {
    async function fetchConnectionState() {
      try {
        // Check if the logged in user is already connected to the profile user
        if (user_id === null) {
          alert("Error: user_id is undefined");
          return;
        }
        const connections = await getUserConnections(user_id);
        if (connections.data.connections.length !== 0) {
          if (
            connections.data.connections.find(
              (user: { user_id: string | null }) => user.user_id === profileId
            )
          ) {
            setConnectionState("connected");
            return;
          }
        }
        setConnectionState("notConnected");

        // Check if the logged in user has an incoming connection request from the profile user
        const incomingConnectionRequests =
          await getIncomingConnectionRequests();
        if (
          incomingConnectionRequests.data.requests !== "No incoming requests"
        ) {
          if (
            incomingConnectionRequests.data.requests.find(
              (user: { user_id: string | null }) => user.user_id === profileId
            )
          ) {
            setConnectionState("received");
            return;
          }
        }

        // Check if the logged in user has an outgoing connection request to the profile user
        const outgoingConnectionRequests =
          await getOutgoingConnectionRequests();
        if (
          outgoingConnectionRequests.data.requests !== "No outgoing requests"
        ) {
          if (
            outgoingConnectionRequests.data.requests.find(
              (user: { user_id: string | null }) => user.user_id === profileId
            )
          ) {
            setConnectionState("sent");
            return;
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchConnectionState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="w-full pb-5 rounded-md bg-slate-200 mx-auto dark:primary-dark">
        <div>
          <img
            className="w-full lg:h-64 h-32 object-cover rounded-t-md"
            src={backdropUrl}
            alt="backdrop"
          />
        </div>
        <div className="flex justify-center -mt-16">
          <img
            className="w-32 h-32 rounded-full border-2 border-white"
            src={profilePicUrl}
            alt="profile"
          />
        </div>

        <div className="flex flex-col justify-center ml-5">
          <h1 className="text-2xl font-bold ">{banner.name}</h1>
          <h2 className="text-lg font-semibold">
            {banner.title == 'undefined' ? "" : banner.title}
          </h2>
          <h3 className="text-lg font-semibold">
            {banner.location == 'undefined'
              ? ""
              : banner.location}
          </h3>
        </div>

        <div className="flex flex-col justify-center mt-5 ml-5">
          <h1 className="text-lg font-semibold ">
            {banner.connections ? banner.connections.length : 0} Connections
          </h1>
        </div>

        <div>
          {connectionState === "notConnected" ? (
            <Button
                variant="contained"
                disableElevation={true}
                sx={{ml:3,mt:3, borderRadius:20, fontSize:15}}

              onClick={() => {
                if (profileId === undefined) {
                  alert("Error: profileId is undefined");
                  return;
                }
                sendConnectionRequest(profileId);
                setConnectionState("sent");
                sendNotification(profileId, "connection"); // send notification of new connection request
              }}
            >
              Connect
            </Button>
          ) : connectionState === "sent" ? (
            <Button
              type="submit"
              variant={'text'}
              sx={{ml:3,mt:3, borderRadius:20, fontSize:15, border:2, borderColor:'primary.main'}}

              onClick={() => {
                if (profileId === undefined) {
                  alert("Error: profileId is undefined");
                  return;
                }
                cancelConnectionRequest(profileId);
                setConnectionState("notConnected");
              }}
              onMouseOver={() => setCancelConnection("Cancel Request")}
              onMouseOut={() => setCancelConnection("Sent Request")}
            >
              {cancelConnection}
            </Button>
          ) : connectionState === "received" ? (
            <div>
              <Button
                type="button"
                variant={'contained'}
                sx={{ml:3,mt:3, borderRadius:20, fontSize:15, border:2, borderColor:'primary.main'}}
                disableElevation={true}
                onClick={() => {
                  if (profileId === undefined) {
                    alert("Error: profileId is undefined");
                    return;
                  }
                  acceptConnectionRequest(profileId);
                  setConnectionState("connected");
                }}
              >
                Accept Connection
              </Button>
              <Button
                type="button"
                variant={'contained'}
                sx={{ml:3,mt:3, borderRadius:20, fontSize:15, border:2, borderColor:'primary.main'}}
                disableElevation={true}
                className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-full m-5"
                onClick={() => {
                  if (profileId === undefined) {
                    alert("Error: profileId is undefined");
                    return;
                  }
                  declineConnectionRequest(profileId);
                  setConnectionState("notConnected");
                }}
              >
                Decline Connection
              </Button>
            </div>
          ) : connectionState === "connected" ? (
            <Button
              type="button"
              variant={'contained'}
                sx={{ml:3,mt:3, borderRadius:20, fontSize:15, border:2, borderColor:'primary.main'}}
                disableElevation={true}
              onClick={() => {
                if (profileId === undefined) {
                  alert("Error: profileId is undefined");
                  return;
                }
                removeConnection(profileId);
                setConnectionState("notConnected");
              }}
              onMouseOver={() => {
                setConnectedButtonMessage("Remove Connection");
              }}
              onMouseLeave={() => {
                setConnectedButtonMessage("Connected");
              }}
            >
              {connectedButtonMessage}
            </Button>
          ) : (
            <div className="text-red-500 font-semibold text-center">
              Error retrieving connection state!
            </div>
          )}
        </div>
      </div>

      {/* click contact info to display a modal */}
      {/* <div className="flex flex-col justify-center ml-5">
        <h1 className="text-lg font-semibold ">{banner.email}</h1>
        <h1 className="text-lg font-semibold ">{banner.phone}</h1>
        <h1 className="text-lg font-semibold ">{banner.website}</h1>
      </div> */}
    </div>
  );
};

export default Banner;
