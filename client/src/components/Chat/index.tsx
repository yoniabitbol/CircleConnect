import React, {useEffect, useState} from 'react';
import Sessions from "./Sessions";
import ChatDisplay from "./ChatDisplay";
import ThreadModel from "../../Models/ThreadModel";
import UserProfileModel from "../../Models/UserProfileModel";
import MessageModel from "../../Models/MessageModel";
import getThreadMessages from "../../http/getThreadMessages";
import io from "socket.io-client";
import {useParams} from 'react-router-dom'

const port = process.env.REACT_APP_PORT || 4000;
const host = process.env.REACT_APP_HOST || "localhost";

const Chat: React.FC<{
  threads: ThreadModel[];
  connections: UserProfileModel[];
  uid: string;
  receivingParticipants: string[];
  refreshThreads: () => void;
}> = ({ threads, connections, receivingParticipants, uid, refreshThreads }) => {
  const [selected, setSelected] = useState<number | any>(-1);
  const [messages, setMessages] = useState<MessageModel[]>([]);
  const {id} = useParams<{id: string}>()
  const socket = io(`http://${host}:${port}`, { query: { userId: uid } });
  useEffect(() => {
      if (id) {
      selectThread();
    }
  },[]);
  useEffect(() => {
    if (id) {
      selectThread();
    }
  }, [id]);
  const selectThread = () => {
    // const index = event.currentTarget.getAttribute("data-key");
    // threads.map((thread) => {
    //   if(thread._id == id) {
    //     setSelected(thread)
    //     getThreadMessages(thread._id).then((res) => {
    //       console.log(res)
    //       setMessages(res.data.messages);
    //     });
    //   }
    // })
    threads.find((thread) => {
        if (thread._id == id) {
            setSelected(thread);
            getThreadMessages(thread._id).then((res) => {
            console.log(res);
            setMessages(res.data.messages);
            });
        }
    });
    };

  // Get only the profiles which the user has a conversation/thread with
  const threadProfiles: UserProfileModel[] = [];
  receivingParticipants.forEach((user_id) => {
    const profile = connections.find(
      (profile) => profile.user_id && profile.user_id == user_id
    );
    profile && threadProfiles.push(profile);
  });
  console.log(threadProfiles)

  return (
    <div className="lg:ml-5 m-5 grid gap-0 grid-cols-1 md:grid-cols-[30%_70%]">
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
        <div> Retreiving sessions ...</div>
      )}
      {selected != -1 ? (
        <ChatDisplay
          thread={selected}
          threadProfile={threadProfiles.find((profile) => {
            const [participant1, participant2] = selected.participants;
              console.log('profile', profile.user_id)
                console.log('participant1', participant1)
                console.log('participant2', participant2)
            if(profile.user_id == participant1 || profile.user_id == participant2){
                return profile
            };
          })}
          messages={messages}
          setMessages={setMessages}
          uid={uid}
          socket={socket}
        />
      ) : (
        <div className="p-10">{"Chat with your Connections"}</div>
      )}
    </div>
  );
};

export default Chat;
