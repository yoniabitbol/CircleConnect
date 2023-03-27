import ChatList from "./ChatList";
import ChatWindow from "./ChatWindow";
import getUserChats from "../../http/getUserChats";

const Chat = () => {
  //   const chats = getUserChats();

  const chats = [];

  return (
    <>
      <div>
        <ChatList />
        <ChatWindow />
      </div>
    </>
  );
};

export default Chat;
