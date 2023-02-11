import React from "react";
import Sessions from "./Sessions";
import ChatDisplay from "./ChatDisplay";

const Chat: React.FC = () => {
  return (
    <div className="">
      <div className="grid gap-0 grid-cols-[30%_70%]">
        <Sessions />
        <ChatDisplay
          session={{
            user: {
              name: "Chad Thundercock",
              picture: "https://cdn.discordapp.com/attachments/800804024109891595/1067509878534438972/IMG_20220119_162228_138.jpg",
            },
          }}
        />
      </div>
    </div>
  );
};

export default Chat;
