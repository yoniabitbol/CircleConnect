import React from "react";
import Sessions from "./Sessions";
import ChatDisplay from "./ChatDisplay";

const Chat: React.FC = () => {
  return (
    <div>
      <Sessions />
      <ChatDisplay />
    </div>
  );
};

export default Chat;
