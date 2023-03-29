import React from "react";
import Chat from "../../components/Chat";
import { useEffect } from "react";
import getCurrentUserThreads from "../../http/getCurrentUserThreads";

const ChatPage: React.FC = () => {
  // const [threads, setThreads] = useState(null);

  useEffect(() => {
    getCurrentUserThreads().then((res) => {
      console.log(res.data);
    });
  }, []);

  return (
    <>
      <Chat />
    </>
  );
};

export default ChatPage;
