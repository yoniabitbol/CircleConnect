import React, { useState } from "react";
import Sessions from "./Sessions";
import ChatDisplay from "./ChatDisplay";
import ThreadModel from "../../Models/ThreadModel";
import UserProfileModel from "../../Models/UserProfileModel";

const Chat: React.FC<{
  threads: ThreadModel[];
  connections: UserProfileModel[];
  uid: string;
  receivingParticipants: string[];
}> = ({ threads, connections, receivingParticipants }) => {
  const [selected, setSelected] = useState<number>(0);

  const selectThread = (event: any) => {
    setSelected(event.currentTarget.getAttribute("data-key"));
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
      <ChatDisplay session={threads[selected]} />
    </div>
  );
};

export default Chat;
