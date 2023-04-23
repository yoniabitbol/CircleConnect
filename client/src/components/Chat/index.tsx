import React, { useEffect, useState } from 'react';
import Sessions from "./Sessions";
import ChatDisplay from "./ChatDisplay";
import ThreadModel from "../../Models/ThreadModel";
import UserProfileModel from "../../Models/UserProfileModel";
import MessageModel from "../../Models/MessageModel";
import getThreadMessages from "../../http/getThreadMessages";
import io from "socket.io-client";
// import {Route,Routes} from "react-router-dom";
import { useTranslation } from "react-i18next";


const port = process.env.REACT_APP_PORT || 4000;
const host = process.env.REACT_APP_HOST || "localhost";

const Chat: React.FC<{
  threads: ThreadModel[];
  connections: UserProfileModel[];
  uid: string;
  receivingParticipants: string[];
  refreshThreads: () => void;
  chatId: string | null;
}> = ({ chatId, threads, connections, receivingParticipants, uid, refreshThreads }) => {
  const [messages, setMessages] = useState<MessageModel[] | any>([]);
  const [selected, setSelected] = useState<number | any>();
  const socket = io(`http://${host}:${port}`, { query: { userId: uid } });
  const { t } = useTranslation();

  useEffect(() => {
    if (selected) {
      setMessages(null)
      //set Timeout 1 second to allow the state to update
      setTimeout(() => {
        getThreadMessages(selected._id).then((res) => {
          setMessages(res.data.messages);
        });
      }, 500)

    }
  }, [selected]);
  useEffect(() => {
    if (chatId) {
      selectThread();
    }
  }, [chatId]);
  const selectThread = () => {
    const sel = threads.find((thread) => {
      return chatId && thread.participants.includes(chatId)
    });
    if (sel) {
      setSelected(sel);
    }
    return sel;
  };

  // Get only the profiles which the user has a conversation/thread with
  const threadProfiles: UserProfileModel[] = [];
  receivingParticipants.forEach((user_id) => {
    const profile = connections.find(
      (profile) => profile.user_id && profile.user_id == user_id
    );
    profile && threadProfiles.push(profile);
  });

  return (
    <div className="lg:ml-5 m-5 grid gap-0 grid-cols-1 md:grid-cols-[30%_70%] dark:background-dark">
      {threadProfiles && threadProfiles.length >= 0 ? (
        <Sessions
          threads={threads}
          threadProfiles={threadProfiles}
          selectThread={selectThread}
          selected={selected}
          connections={connections}
          refreshThreads={refreshThreads}
        />
      ) : (
        <div> {t('chat.label.retrieving')}</div>
      )}
      {selected || selectThread() ? (
        <ChatDisplay
          thread={selected || selectThread()}
          threadProfile={selected && threadProfiles.find((profile) => {
            const [participant1, participant2] = selected.participants;
            if (profile.user_id == participant1 || profile.user_id == participant2) {
              return profile
            };
          })}
          messages={messages && messages}
          setMessages={setMessages}
          uid={uid}
          socket={socket}
        />
      ) : (
        <div className="p-10">{t('chat.label.chatwithConnxn')}</div>
      )}
    </div>
  );
};

export default Chat;
