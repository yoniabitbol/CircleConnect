import React, { useState, useEffect } from "react";
import SessionItem from "../SessionItem";
import ThreadModel from "../../../Models/ThreadModel";
import UserProfileModel from "../../../Models/UserProfileModel";
import createNewThread from "../../../http/createNewThread";
import {Avatar, Button} from '@mui/material';
import getUserProfilePic from "../../../http/getUserPicturePic";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

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
  selected: number | any;
  threadProfiles: UserProfileModel[];
  connections: UserProfileModel[];
}> = (props
) => {
    const { t } = useTranslation();
    const { threadProfiles, connections, selected, refreshThreads } = props;
    const [showModal, setShowModal] = useState(false);
    const [userProfilePics, setUserProfilePics] = useState<{
      [key: string]: string;
    }>({});

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

    const connectionsWithThread = connections.filter((conn) => {
      return threadProfiles
        .map((profile) => profile.user_id)
        .includes(conn.user_id);
    });
    useEffect(() => {
      async function fetchUserProfilePics() {
        const profilePicUrls = await Promise.all(
          connections.map(async (user: any) => {
            const profilePicUrl = await getUserProfilePic(user.picture);
            return { userId: user.user_id, profilePicUrl };
          })
        );
        const profilePicMap = profilePicUrls.reduce(
          (
            map: { [key: string]: string },
            obj: {
              userId: string;
              profilePicUrl: string;
            }
          ) => {
            map[obj.userId] = obj.profilePicUrl;
            return map;
          },
          {}
        );
        setUserProfilePics(profilePicMap);
      }

      fetchUserProfilePics();
    }, [connections]);

    return (
      <div>
        <div className="ml-15 mt-5 pb-5 rounded-md bg-white overflow-auto dark:primary-dark">
          <div className="justify-start ml-10 my-6">
            <span className="text-sm font-bold">{t('chat.label.chats')}</span>
          </div>
          <hr className="border-gray-100 border" />
          {connectionsWithThread.map((conn, index) => {
            const userProfilePic = userProfilePics[conn.user_id || ""];
            return (
              <Link
                to={`${conn.user_id}`}
                className="w-full h-full"
                key={conn.user_id}
                data-key={index}
                onClick={() => props.selectThread(conn.user_id)}
              >
                <SessionItem
                  selected={selected && selected.participants.includes(conn.user_id)}
                  session={{
                    user: {
                      name: conn.name || "USER DELETED",
                      picture: userProfilePic
                        ? userProfilePic
                        : "default-user.jpg",
                    },
                    latestMsg: "",
                  }}
                />
              </Link>
            );
          })}
        </div>

        <div>
          <div className="flex justify-center">
            <Button
              // className=" w-4/5 pb-2 mt-5 text-sky-50 rounded-lg"
              variant="contained"
              style={{ width:'100%',height:'100%',marginTop:5, borderRadius:10}}
              onClick={handleOpenModal}
            >
              <div className="flex justify-center pt-1">{t('chat.buttons.startChat')}</div>
            </Button>
          </div>
        </div>

        {showModal && (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div
                className="fixed inset-0 transition-opacity"
                aria-hidden="true"
              >
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>

              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <div
                className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-headline"
              >
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 dark:primary-dark">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
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
                        className="text-lg leading-6 font-medium"
                        id="modal-headline"
                      >
                        {t('chat.label.selectConnxn')}
                      </h3>
                      <div className="mt-2">
                        {filteredConnections.map((conn) => (
                          <button
                            key={conn.user_id}
                            onClick={() => {
                              if (!conn.user_id) {
                                alert(
                                  t('chat.label.unableToCreate')
                                );
                                return;
                              }
                              createNewThread(conn.user_id).then((res) => {
                                if (res.status === "success" || res.ok) {
                                  refreshThreads();
                                  handleCloseModal();
                                }
                              });
                            }}
                            className="mt-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black hover:bg-indigo-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 flex items-center dark:secondary-dark"
                          >
                            <Avatar className="mr-2" src={conn.picture} />
                            {conn.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse dark:primary-dark">
                  <Button
                    onClick={handleCloseModal}
                    variant="contained"
                  >
                    {t('chat.buttons.close')}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

export default Sessions;