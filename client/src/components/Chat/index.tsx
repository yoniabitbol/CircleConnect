import React, { useState } from "react";
import Sessions from "./Sessions";
import ChatDisplay from "./ChatDisplay";
import ThreadModel from "../../Models/ThreadModel";
import UserProfileModel from "../../Models/UserProfileModel";
import MessageModel from "../../Models/MessageModel";
import getThreadMessages from "../../http/getThreadMessages";
import io from "socket.io-client";

const Chat: React.FC<{
  threads: ThreadModel[];
  connections: UserProfileModel[];
  uid: string;
  receivingParticipants: string[];
  refreshThreads: () => void;
}> = ({ threads, connections, receivingParticipants, uid, refreshThreads }) => {
  const [selected, setSelected] = useState<number>(-1);
  const [messages, setMessages] = useState<MessageModel[]>([]);

  const socket = io("http://localhost:4000", { query: { userId: uid } });

  const selectThread = (event: any) => {
    const index = event.currentTarget.getAttribute("data-key");
    setSelected(index);

    getThreadMessages(threads[index]._id).then((res) => {
      setMessages(res.data.messages);
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

  return (
    <div className="lg:ml-5 m-5 grid gap-0 grid-cols-1 md:grid-cols-[30%_70%]">
      {threadProfiles && threadProfiles.length > 0 ? (
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
          thread={threads[selected]}
          threadProfile={threadProfiles.find((profile) => {
            const [participant1, participant2] = threads[selected].participants;
            return (
              profile.user_id == participant1 || profile.user_id == participant2
            );
          })}
          messages={messages}
          setMessages={setMessages}
          uid={uid}
          socket={socket}
        />
      ) : (
        <div className="p-10">{"<<< Select a conversation!"}</div>
      )}
    </div>
  );
};

export default Chat;
