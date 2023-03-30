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
}> = ({ threads, connections, receivingParticipants, uid }) => {
  const [selected, setSelected] = useState<number>(0);
  const [messages, setMessages] = useState<MessageModel[]>([]);

  const selectThread = (event: any) => {
    const index = event.currentTarget.getAttribute("data-key");
    setSelected(index);

    getThreadMessages(threads[index]._id).then((res) => {
      setMessages(res.data.messages);
    });
  };

  // Get only the profiles which the user has a conversation/thread with
  const threadProfiles = connections.filter((profile) => {
    return profile.user_id && receivingParticipants.includes(profile.user_id);
  });
  return (
    <div className="lg:ml-5 m-5 grid gap-0 grid-cols-1 md:grid-cols-[30%_70%]">
      <Sessions
        threads={threads}
        threadProfiles={threadProfiles}
        selectThread={selectThread}
        selected={selected}
      />
      <ChatDisplay session={threads[selected]} messages={messages} uid={uid} />
    </div>
  );
};

export default Chat;
