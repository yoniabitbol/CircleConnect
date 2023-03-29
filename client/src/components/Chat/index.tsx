import React, { useState } from "react";
import Sessions from "./Sessions";
import ChatDisplay from "./ChatDisplay";
import { Thread } from "../../Models/SessionModel";

const Chat: React.FC = () => {
  const [sessions] = useState<Thread[]>([
    {
      id: 0,
      name: "Chad Thundercock",
      picture:
        "https://cdn.discordapp.com/attachments/800804024109891595/1067509878534438972/IMG_20220119_162228_138.jpg",
      latestMsg: "Hey gamer",
    },
    {
      id: 1,
      name: "Hungry Boi",
      picture:
        "https://cdn.discordapp.com/attachments/672975677460447232/1072778010597535784/photo_2022-05-21_09-09-15.jpg",
      latestMsg: "Are you good",
    },
  ]);

  const [selected, setSelected] = useState<number>(0);

  const selectSession = (event: any) => {
    setSelected(event.currentTarget.getAttribute("data-key"));
  };
  return (
    <div className="lg:ml-5 m-5 grid gap-0 grid-cols-1 md:grid-cols-[30%_70%]">
      <Sessions
        sessions={sessions}
        selectSession={selectSession}
        selected={selected}
      />
      <ChatDisplay session={sessions[selected]} />
    </div>
  );
};

export default Chat;
