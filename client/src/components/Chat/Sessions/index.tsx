import React, { useState, useEffect } from "react";
import SessionItem from "../SessionItem";
import ThreadModel from "../../../Models/ThreadModel";
import UserProfileModel from "../../../Models/UserProfileModel";
import createNewThread from "../../../http/createNewThread";
import { Avatar } from "@mui/material";
import getUserProfilePic from "../../../http/getUserPicturePic";

export type Thread = {
  id: number;
  name: string;
  picture: string;
  latestMsg: string;
};

const Sessions: React.FC<{
  threads: ThreadModel[];
  refreshThreads: () => void;
  selectThread: (event: any) => void;
  selected: number;
  threadProfiles: UserProfileModel[];
  connections: UserProfileModel[];
}> = ({
  threads,
  refreshThreads,
  selectThread,
  selected,
  threadProfiles,
  connections,
}) => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Get the profiles who you DON'T have a conversation with yet
  const filteredConnections = connections.filter(
    (conn) =>
      !threadProfiles.map((profile) => profile.user_id).includes(conn.user_id)
  );

  const [userProfilePics, setUserProfilePics] = useState<{ [key: string]: string }>({});

useEffect(() => {
  async function fetchUserProfilePics() {
    const profilePicUrls = await Promise.all(
      connections.map(async (user: any) => {
        const profilePicUrl = await getUserProfilePic(user.picture);
        return { userId: user.user_id, profilePicUrl };
      })
    );
    const profilePicMap = profilePicUrls.reduce((map: { [key: string]: string }, obj: { userId: string, profilePicUrl: string }) => {
      map[obj.userId] = obj.profilePicUrl;
      return map;
    }, {});
    setUserProfilePics(profilePicMap);
  }
  fetchUserProfilePics();
}, [connections]);
  
  return (
    <div>
      <div className="ml-15 mt-5 pb-5 rounded-md bg-white overflow-auto">
        <div className="justify-start ml-10 my-6">
          <span className="text-sm font-bold">CHATS</span>
        </div>
        <hr className="border-gray-100 border" />
        {threads.map((thread, index) => {
      const threadProfile = threadProfiles[index];
      const userProfilePic = userProfilePics[threadProfile.user_id ?? ""];
      return (
        <button
          className="w-full h-full"
          key={thread._id}
          data-key={index}
          type="submit"
          onClick={(event) => selectThread(event)}
        >
          <SessionItem
            selected={selected == index}
            session={{
              user: {
                name: threadProfile.name,
                picture: userProfilePic ? userProfilePic : "",
              },
              latestMsg: "",
            }}
          />
        </button>
      );
    })}
      </div>

      <div className="mt-10 pb-5 rounded-md bg-white">
        <div className="flex justify-center">
          <button
            className=" w-4/5 pb-2 mt-5 text-sky-50 rounded-lg"
            type="button"
            style={{ background: "#4B47B7" }}
            onClick={handleOpenModal}
          >
            <div className="flex justify-center pt-1">START NEW CHAT</div>
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
              >
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div
                      className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10"
                    >
                      <svg
                        className="h-6 w-6 text-green-600"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3
                        className="text-lg leading-6 font-medium text-gray-900"
                        id="modal-headline"
                      >
                        Select a Connection
                      </h3>
                      <div className="mt-2">
                        {filteredConnections.map((conn) => (
                          <button
                          key={conn.user_id}
                          onClick={() => {
                            if (!conn.user_id) {
                              alert("Unable to create thread with selected user.");
                              return;
                            }
                            createNewThread(conn.user_id).then((res) => {
                              if (res.status === "success" || res.ok) {
                                refreshThreads();
                                handleCloseModal();
                              }
                            });
                          }}
                          className="mt-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black hover:bg-indigo-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 flex items-center"
                        >
                          <Avatar className="mr-2" src={conn.picture}/>
                            {conn.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    onClick={handleCloseModal}
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-500 text-base font-medium text-white hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
        </div>
      )}
    </div>
  );
};


export default Sessions;
