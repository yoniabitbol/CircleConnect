import React, { useState } from "react";
import Sessions from "./Sessions";
import ChatDisplay from "./ChatDisplay";
import ThreadModel from "../../Models/ThreadModel";
import UserProfileModel from "../../Models/UserProfileModel";
import MessageModel from "../../Models/MessageModel";
import getThreadMessages from "../../http/getThreadMessages";

const Chat: React.FC<{
  threads: ThreadModel[];
  connections: UserProfileModel[];
  uid: string;
  receivingParticipants: string[];
  refreshThreads: () => void;
}> = ({ threads, connections, receivingParticipants, uid, refreshThreads }) => {
  const [selected, setSelected] = useState<number>(-1);
  const [messages, setMessages] = useState<MessageModel[]>([]);

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
      <Sessions
        threads={threads}
        threadProfiles={threadProfiles}
        selectThread={selectThread}
        selected={selected}
        connections={connections}
        refreshThreads={refreshThreads}
      />
      {selected != -1 ? (
        <ChatDisplay
          threadProfile={threadProfiles.find((profile) => {
            return (
              profile.user_id == threads[selected].participants[0] ||
              profile.user_id == threads[selected].participants[1]
            );
          })}
          messages={messages}
          uid={uid}
        />
      ) : (
        <div className="p-10">{"<<< Select a conversation!"}</div>
      )}
    </div>
  );
};

export default Chat;
